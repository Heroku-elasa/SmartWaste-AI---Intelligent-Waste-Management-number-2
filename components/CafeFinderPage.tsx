
import React, { useState, useCallback, useMemo } from 'react';
import mammoth from 'mammoth';
import { findGrantsRaw } from '../services/geminiService';
import { Grant, ApplicationDraft } from '../types';
import { useLanguage } from '../types';

// Helper component for clickable example prompts
const ExamplePrompts: React.FC<{ prompts: string[], onPromptClick: (prompt: string) => void, t: (key: string) => string }> = ({ prompts, onPromptClick, t }) => {
    if (!prompts || prompts.length === 0) return null;
    return (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            <span className="text-xs text-gray-400 font-medium self-center">{t('examplePrompts.try')}</span>
            {prompts.map((prompt, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => onPromptClick(prompt)}
                    className="px-2.5 py-1 bg-secondary/30 text-gray-200 text-xs font-medium rounded-full hover:bg-secondary/50 hover:text-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    {prompt}
                </button>
            ))}
        </div>
    );
};

// A more robust helper to parse a markdown link or plain URL.
const parseMarkdownLink = (text: string): { url: string; title: string } => {
    const markdownMatch = /\[([^\]]+)\]\(([^)]+)\)/.exec(text);
    let url: string;
    let title: string;

    if (markdownMatch) {
        title = markdownMatch[1];
        url = markdownMatch[2].trim();
    } else {
        url = text.trim();
        title = url;
    }
    
    const isLikelyUrl = url.includes('.') && !url.includes(' ');

    if (isLikelyUrl) {
        if (!/^https?:\/\//i.test(url)) {
            url = 'https://' + url;
        }
        return { title, url };
    }

    return { title: text.trim(), url: '' };
};

// Helper to parse multiple markdown links from a single table cell.
const parseDocumentLinks = (text: string): { title: string; url: string }[] => {
    if (!text) return [];
    const links: { title: string; url: string }[] = [];
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        links.push({ title: match[1], url: match[2].trim() });
    }
    return links;
};


// Main function to parse the markdown table from Gemini's response
const parseGrantTable = (markdown: string): Grant[] => {
    const grants: Grant[] = [];
    
    let tableMarkdown = markdown;
    const headerKeywords = ['| Grant Title', '|Grant Title', '| Grant Name', '|Grant Name', '| Relevance Score'];
    let tableStartIndex = -1;
    
    for (const keyword of headerKeywords) {
        const index = tableMarkdown.indexOf(keyword);
        if (index !== -1) {
            tableStartIndex = index;
            break;
        }
    }

    if (tableStartIndex === -1) {
        console.warn("Could not find a markdown table header in the AI response.");
        return [];
    }
    
    tableMarkdown = tableMarkdown.substring(tableStartIndex);

    const rows = tableMarkdown.split('\n').map(row => row.trim()).filter(row => row.startsWith('|') && row.endsWith('|'));

    if (rows.length < 2) { 
        return [];
    }
    
    const headerRow = rows[0];
    const headers = headerRow.split('|').map(h => h.trim().toLowerCase()).slice(1, -1);
    
    const headerMap: { [key: string]: number } = {};
    const grantTitleKeys = ['grant title', 'grant name', 'grant'];
    const fundingBodyKeys = ['funding body', 'organization'];
    const summaryKeys = ['summary', 'description'];
    const deadlineKeys = ['deadline', 'due date'];
    const linkKeys = ['link', 'url', 'website'];
    const requirementDocumentsKeys = ['requirement documents', 'documents'];
    const relevanceScoreKeys = ['relevance score', 'relevance'];
    const amountKeys = ['funding amount', 'amount'];
    const geographyKeys = ['geography', 'country', 'region'];

    headers.forEach((header, index) => {
        if (grantTitleKeys.some(key => header.includes(key))) headerMap.grantTitle = index;
        if (fundingBodyKeys.some(key => header.includes(key))) headerMap.fundingBody = index;
        if (summaryKeys.some(key => header.includes(key))) headerMap.summary = index;
        if (deadlineKeys.some(key => header.includes(key))) headerMap.deadline = index;
        if (linkKeys.some(key => header.includes(key))) headerMap.link = index;
        if (requirementDocumentsKeys.some(key => header.includes(key))) headerMap.requirementDocuments = index;
        if (relevanceScoreKeys.some(key => header.includes(key))) headerMap.relevanceScore = index;
        if (amountKeys.some(key => header.includes(key))) headerMap.amount = index;
        if (geographyKeys.some(key => header.includes(key))) headerMap.geography = index;
    });
    
    if (headerMap.grantTitle === undefined || headerMap.link === undefined) {
        console.warn("Could not find essential 'Grant Title' or 'Link' headers in the table.");
        return [];
    }

    let dataRowStartIndex = 1;
    if (rows.length > 1 && rows[1].includes('---')) {
        dataRowStartIndex = 2;
    }

    for (let i = dataRowStartIndex; i < rows.length; i++) {
        const columns = rows[i].split('|').map(col => col.trim()).slice(1, -1);
        
        const grantTitle = columns[headerMap.grantTitle] ?? '';
        if (!grantTitle) continue;

        const fundingBody = headerMap.fundingBody !== undefined ? (columns[headerMap.fundingBody] ?? 'N/A') : 'N/A';
        const summary = headerMap.summary !== undefined ? (columns[headerMap.summary] ?? 'N/A') : 'N/A';
        const deadline = headerMap.deadline !== undefined ? (columns[headerMap.deadline] ?? 'Not specified') : 'Not specified';
        const rawLink = headerMap.link !== undefined ? (columns[headerMap.link] ?? '') : '';
        const rawDocs = headerMap.requirementDocuments !== undefined ? (columns[headerMap.requirementDocuments] ?? '') : '';
        
        const amount = headerMap.amount !== undefined ? (columns[headerMap.amount] ?? 'Not specified') : 'Not specified';
        const geography = headerMap.geography !== undefined ? (columns[headerMap.geography] ?? 'Not specified') : 'Not specified';
        const rawScore = headerMap.relevanceScore !== undefined ? columns[headerMap.relevanceScore] : '0';
        const relevanceScore = parseInt(rawScore?.replace('%', '').trim() || '0', 10);

        const linkData = parseMarkdownLink(rawLink);
        if (!linkData.url) continue; // Skip grants without a valid link, as it's our primary key

        const requirementDocuments = parseDocumentLinks(rawDocs);

        grants.push({
            grantTitle,
            issuingAgency: fundingBody,
            fundingBody,
            description: summary,
            summary,
            deadline,
            link: linkData.url,
            eligibility: 'See details', // Default or parsed
            linkTitle: linkData.title,
            requirementDocuments,
            relevanceScore: isNaN(relevanceScore) ? 0 : relevanceScore,
            amount,
            geography
        });
    }

    return grants;
};

const parseAmount = (amountStr?: string): number => {
    if (!amountStr || typeof amountStr !== 'string') return 0;
    const cleaned = amountStr.replace(/[^0-9.MK]/gi, '');
    let multiplier = 1;
    if (cleaned.toUpperCase().includes('M')) multiplier = 1000000;
    else if (cleaned.toUpperCase().includes('K')) multiplier = 1000;
    const numberPart = parseFloat(cleaned.replace(/[MK]/gi, ''));
    return isNaN(numberPart) ? 0 : numberPart * multiplier;
};

const parseDeadline = (deadlineStr?: string): number => {
    if (!deadlineStr || typeof deadlineStr !== 'string') return Infinity;
    const lower = deadlineStr.toLowerCase();
    if (lower.includes('rolling') || lower.includes('not specified')) return Infinity;
    const date = new Date(deadlineStr);
    return isNaN(date.getTime()) ? Infinity - 1 : date.getTime();
};

const readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = (error) => reject(error);
        reader.onload = async () => {
            try {
                if (file.name.toLowerCase().endsWith('.docx')) {
                    const arrayBuffer = reader.result as ArrayBuffer;
                    const result = await mammoth.extractRawText({ arrayBuffer });
                    resolve(result.value);
                } else {
                    resolve(reader.result as string);
                }
            } catch (e) {
                console.error("Error processing file:", e);
                reject(new Error("Failed to process the document. It may be corrupted."));
            }
        };

        if (file.name.toLowerCase().endsWith('.docx')) {
            reader.readAsArrayBuffer(file);
        } else {
            reader.readAsText(file);
        }
    });
};

interface GrantFinderPageProps {
  onSearch?: (query: string) => void;
  isLoading?: boolean;
  error?: string | null;
  results?: Grant[] | null;
  isQuotaExhausted: boolean;
  onGenerateApplication: (projectDescription: string, grant: Grant) => void;
  isGeneratingApplication: boolean;
  applicationDraft: ApplicationDraft | null;
  applicationError: string | null;
  // New Props
  onAnalyzeGrant: (grant: Grant) => void;
  savedGrants: Grant[];
  onSaveGrant: (grant: Grant) => void;
  onRemoveGrant: (grant: Grant) => void;
  onClearAllSaved: () => void;
  onNoteChange: (index: number, note: string) => void;
}

type SortKey = 'relevanceScore' | 'deadline' | 'amount' | 'geography';

const GrantFinderPage: React.FC<GrantFinderPageProps> = ({ 
    isQuotaExhausted,
    onGenerateApplication,
    isGeneratingApplication,
    applicationDraft,
    applicationError,
    // New Props
    onAnalyzeGrant,
    savedGrants,
    onSaveGrant,
    onRemoveGrant,
    onClearAllSaved,
    onNoteChange
}) => {
    const { t } = useLanguage();
    const [keywords, setKeywords] = useState('');
    const [maxResults, setMaxResults] = useState<number>(15);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [rawTextResult, setRawTextResult] = useState<string | null>(null);
    const [sortKey, setSortKey] = useState<SortKey>('relevanceScore');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isFileLoading, setIsFileLoading] = useState<boolean>(false);
    
    // Local state for grants found in current session
    const [foundGrants, setFoundGrants] = useState<Grant[]>([]);
    const [selectedGrant, setSelectedGrant] = useState<Grant | null>(null);
    const [projectDescription, setProjectDescription] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            setSelectedFile(null);
            return;
        }
        const allowedExtensions = ['.docx', '.txt', '.md'];
        const fileExtension = file.name.slice(file.name.lastIndexOf('.')).toLowerCase();

        if (!allowedExtensions.includes(fileExtension)) {
            setError(t('grantFinder.fileTypeError'));
            setSelectedFile(null);
            event.target.value = '';
            return;
        }

        setSelectedFile(file);
        setError(null);
    };

    const handleClearFile = () => {
        setSelectedFile(null);
        const fileInput = document.getElementById('file-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    const handleSearch = async () => {
        if (!keywords.trim() && !selectedFile) {
            setError(t('grantFinderPage.validationError')); // Reusing key or need new one
            return;
        }

        setError(null);
        setRawTextResult(null);
        setFoundGrants([]);

        let documentText = '';
        if (selectedFile) {
            setIsFileLoading(true);
            try {
                documentText = await readFileContent(selectedFile);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Error reading file');
                setIsFileLoading(false);
                return;
            } finally { setIsFileLoading(false); }
        }
        
        setIsLoading(true);

        const commonInstructions = t('grantFinder.prompt.common');
        let finalPrompt;
        if (documentText) {
            const keywordInstruction = keywords.trim() 
                ? t('grantFinder.prompt.supplementalKeywords').replace('{keywords}', keywords)
                : t('grantFinder.prompt.noSupplementalKeywords');
            finalPrompt = t('grantFinder.prompt.fileBased')
                .replace('{common}', commonInstructions)
                .replace('{documentText}', documentText)
                .replace('{keywordInstruction}', keywordInstruction)
                .replace('{maxResults}', maxResults.toString());
        } else {
            const searchQueriesString = keywords.split(',').map(k => k.trim()).filter(Boolean).map(q => `"${q}"`).join(', ');
            finalPrompt = t('grantFinder.prompt.keywordBased')
                .replace('{common}', commonInstructions)
                .replace('{queries}', searchQueriesString)
                .replace('{maxResults}', maxResults.toString());
        }

        try {
            const grantResults = await findGrantsRaw(finalPrompt);
            const parsed = parseGrantTable(grantResults.text);
            
            if (parsed.length > 0) {
                setFoundGrants(parsed);
            } else if (grantResults.text) {
                setRawTextResult(grantResults.text);
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred during the search.');
        } finally { setIsLoading(false); }
    };
    
    const isGrantSaved = useCallback((grant: Grant): boolean => {
        return savedGrants.some(g => g.grantTitle === grant.grantTitle && g.link === grant.link);
    }, [savedGrants]);

    const sortedGrants = useMemo(() => {
        const grantsToSort = [...foundGrants];
        grantsToSort.sort((a, b) => {
            switch (sortKey) {
                case 'relevanceScore': return (b.relevanceScore ?? 0) - (a.relevanceScore ?? 0);
                case 'amount': return parseAmount(b.amount) - parseAmount(a.amount);
                case 'deadline': return parseDeadline(a.deadline) - parseDeadline(b.deadline);
                case 'geography': return (a.geography ?? '').localeCompare(b.geography ?? '');
                default: return 0;
            }
        });
        return grantsToSort;
    }, [foundGrants, sortKey]);

    const RelevanceBadge: React.FC<{ score: number }> = ({ score }) => {
        const getPillColor = () => {
            if (score >= 75) return 'bg-green-500/20 text-green-300';
            if (score >= 50) return 'bg-yellow-500/20 text-yellow-300';
            return 'bg-red-500/20 text-red-300';
        };
        return (
            <div className={`inline-flex items-baseline px-2 py-1 rounded-full text-xs font-semibold ${getPillColor()}`}>
                <span className="font-bold text-sm">{score}</span><span className="text-xs">%</span>
                <span className="ml-1.5 font-medium">{t('grantAnalyzer.relevance')}</span>
            </div>
        );
    };

    const handleGenerate = () => {
        if (projectDescription.trim() && selectedGrant) {
            onGenerateApplication(projectDescription, selectedGrant);
        }
    }

    // --- Application Assistant View ---
    if (selectedGrant) {
        return (
            <section id="grant-application-assistant" className="py-16 sm:py-24 animate-fade-in">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <button onClick={() => { setSelectedGrant(null); }} className="flex items-center gap-2 text-sm text-gray-500 hover:text-dark transition-colors mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                        {t('grantFinderPage.backToResults')}
                    </button>
                    <h2 className="text-3xl font-bold text-dark text-center mt-4">
                        {t('grantFinderPage.applicationAssistant', { grantName: selectedGrant.grantTitle })}
                    </h2>
                    
                    <div className="mt-8 bg-white rounded-lg p-8 shadow-lg border border-gray-200 space-y-6">
                        <div>
                          <label htmlFor="project-description" className="block text-sm font-medium text-gray-700">{t('grantFinderPage.projectDescriptionLabel')}</label>
                          <textarea
                            id="project-description"
                            rows={7}
                            value={projectDescription}
                            onChange={(e) => setProjectDescription(e.target.value)}
                            className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-dark placeholder-gray-500"
                            placeholder={t('grantFinderPage.projectDescriptionPlaceholder')}
                          />
                           <ExamplePrompts 
                            prompts={t('examplePrompts.grantApplication')} 
                            onPromptClick={setProjectDescription} 
                            t={t} 
                          />
                        </div>
                        <div>
                          <button
                            onClick={handleGenerate}
                            disabled={isGeneratingApplication || isQuotaExhausted || !projectDescription.trim()}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 disabled:bg-secondary disabled:cursor-not-allowed transition-colors"
                          >
                            {isGeneratingApplication ? t('grantFinderPage.generatingDraft') : t('grantFinderPage.generateDraftButton')}
                          </button>
                        </div>
                    </div>

                     <div className="mt-12">
                        {isGeneratingApplication && (
                          <div className="flex flex-col items-center justify-center py-10 text-center">
                            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-primary"></div>
                            <p className="mt-4 text-gray-600">{t('grantFinderPage.generatingDraft')}</p>
                          </div>
                        )}
                        {applicationError && <div className="text-red-700 p-4 bg-red-100 rounded-md max-w-3xl mx-auto">{applicationError}</div>}
                        
                        {applicationDraft && (
                            <div className="animate-fade-in bg-white p-8 rounded-lg border border-gray-200 space-y-10 shadow-md">
                                <h2 className="text-2xl font-bold text-dark text-center border-b border-gray-200 pb-4">{t('grantFinderPage.draftResultsTitle')}</h2>

                                <div>
                                    <h3 className="text-lg font-semibold text-primary mb-4">{t('grantFinderPage.businessPlanOutline')}</h3>
                                    <div className="space-y-4">
                                    {applicationDraft.businessPlanOutline.map((item, i) => (
                                        <div key={i} className="p-4 bg-gray-50 border-l-4 border-secondary rounded-r-lg">
                                            <h4 className="font-bold text-dark">{item.section}</h4>
                                            <p className="text-sm text-gray-700 mt-1">{item.content}</p>
                                        </div>
                                    ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-primary mb-4">{t('grantFinderPage.applicationSections')}</h3>
                                    <div className="space-y-4">
                                    {applicationDraft.applicationSections.map((item, i) => (
                                        <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                            <h4 className="font-bold text-dark">{item.sectionTitle}</h4>
                                            <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap leading-relaxed">{item.draftedContent}</p>
                                        </div>
                                    ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold text-primary mb-4">{t('grantFinderPage.nextSteps')}</h3>
                                    <ul className="list-disc list-inside space-y-2 text-gray-700">
                                        {applicationDraft.nextSteps.map((step, i) => <li key={i}>{step}</li>)}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="grant-finder" className="py-16 sm:py-24 space-y-12">
            <div className="text-center">
                <h2 className="text-4xl font-extrabold text-dark">{t('grantFinder.title')}</h2>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">{t('grantFinder.subtitle')}</p>
            </div>

            <div className="max-w-3xl mx-auto bg-white rounded-lg p-8 shadow-lg border border-gray-200 space-y-6">
                <div>
                    <label htmlFor="file-upload" className="block text-sm font-medium text-gray-700 mb-2">{t('grantFinder.uploadLabel')}</label>
                    <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 p-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-md">
                        <label htmlFor="file-upload" className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors w-full sm:w-auto text-center">
                            <span>{t('grantFinder.selectFile')}</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} accept=".docx,.txt,.md" />
                        </label>
                        <div className="flex-grow">
                        {selectedFile ? (
                            <div className="flex items-center justify-between text-sm text-gray-700 w-full">
                                <span className="truncate pr-2">{selectedFile.name}</span>
                                <button onClick={handleClearFile} className="text-red-500 hover:text-red-700 font-bold text-lg flex-shrink-0 rounded-full w-6 h-6 flex items-center justify-center" aria-label={t('grantFinder.removeFile')} title={t('grantFinder.removeFile')}>&times;</button>
                            </div>
                        ) : <p className="text-sm text-gray-500">{t('grantFinder.fileTypes')}</p> }
                        </div>
                    </div>
                </div>
                 <div>
                    <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
                        <div className="relative flex justify-center"><span className="bg-white px-2 text-sm text-gray-500">{t('grantFinder.or')}</span></div>
                    </div>
                </div>
                <div>
                    <label htmlFor="keywords-prompt" className="block text-sm font-medium text-gray-700">{t('grantFinder.keywordsLabel')}</label>
                    <textarea id="keywords-prompt" rows={3} value={keywords} onChange={(e) => setKeywords(e.target.value)}
                        className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-dark placeholder-gray-400"
                        placeholder={t('grantFinder.keywordsPlaceholder')} />
                     <ExamplePrompts 
                        prompts={t('examplePrompts.grantFinder')} 
                        onPromptClick={setKeywords} 
                        t={t} 
                    />
                </div>
                <div>
                    <label htmlFor="max-results" className="block text-sm font-medium text-gray-700">{t('grantFinder.maxResults')} ({maxResults})</label>
                    <input id="max-results" type="range" min="5" max="50" step="5" value={maxResults} onChange={(e) => setMaxResults(Number(e.target.value))}
                        className="mt-1 block w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                </div>
                <div>
                    <button onClick={handleSearch} disabled={isLoading || isFileLoading || (!keywords.trim() && !selectedFile) || isQuotaExhausted}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                        {isFileLoading ? t('grantFinder.readingFile') : isLoading ? t('grantFinder.finding') : isQuotaExhausted ? t('quotaErrorModal.title') : t('grantFinder.findButton')}
                    </button>
                </div>
            </div>
            
            {savedGrants.length > 0 && (
                <div className="mt-12 space-y-8 animate-fade-in max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-dark">{t('grantFinder.savedTitle')}</h3>
                        <button onClick={onClearAllSaved} className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-semibold rounded-md transition-colors">{t('grantFinder.clearAll')}</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {savedGrants.map((grant, index) => (
                            <div key={`${grant.grantTitle}-${index}`} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col">
                                <a href={grant.link} target="_blank" rel="noopener noreferrer" className="hover:underline"><h4 className="text-lg font-bold text-primary">{grant.grantTitle}</h4></a>
                                <p className="text-sm text-gray-500 mb-2">{t('grantFinder.from')} {grant.fundingBody}</p>
                                <p className="text-sm font-semibold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-md self-start mb-4">{t('grantFinder.deadlineLabel')}: {grant.deadline}</p>
                                <div className="space-y-3 text-sm flex-grow">
                                    <p><strong className="text-gray-700">{t('grantFinder.summaryLabel')}:</strong> {grant.summary}</p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <label htmlFor={`notes-${index}`} className="block text-sm font-medium text-gray-700 mb-2">{t('grantFinder.notesLabel')}</label>
                                    <textarea id={`notes-${index}`} rows={3}
                                        className="w-full bg-gray-50 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-dark transition-colors"
                                        placeholder={t('grantFinder.notesPlaceholder')} value={grant.notes || ''} onChange={(e) => onNoteChange(index, e.target.value)} />
                                </div>
                                <div className="mt-6 grid grid-cols-2 gap-2">
                                     <button onClick={() => onRemoveGrant(grant)} className="col-span-2 text-center bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors">{t('grantFinder.remove')}</button>
                                     <button onClick={() => setSelectedGrant(grant)} disabled={isQuotaExhausted} className="col-span-2 text-center bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">{t('grantFinder.useForProposal')}</button>
                                     <button onClick={() => onAnalyzeGrant(grant)} disabled={!grant.link || isQuotaExhausted} className="col-span-2 text-center bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">{t('grantFinder.analyze')}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-12 space-y-8 max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-dark">{t('grantFinder.crateTitle')}</h3>
                        <p className="text-sm text-gray-600">{t('grantFinder.crateSubtitle')}</p>
                    </div>
                    {foundGrants.length > 0 &&
                        <button onClick={() => setFoundGrants([])} className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-semibold rounded-md transition-colors">{t('grantFinder.clearCrate')}</button>
                    }
                </div>

                {isLoading && (
                    <div className="max-w-3xl mx-auto bg-white rounded-lg p-8 shadow-sm border border-gray-200 text-center">
                        <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-primary mx-auto mb-4"></div>
                        <h3 className="text-lg font-semibold text-dark">{t('grantFinder.loadingTitle')}</h3>
                        <p className="text-gray-500 mt-2">{t('grantFinder.loadingSubtitle')}</p>
                    </div>
                )}
                {error && !error.includes('(Quota Exceeded)') && <div className="max-w-3xl mx-auto text-red-700 p-4 bg-red-100 rounded-md">{error}</div>}
                
                {!isLoading && (
                    <div className="space-y-6">
                        {sortedGrants.length > 0 ? (
                            <>
                                <div className="flex justify-end">
                                    <label htmlFor="sort-key" className="text-sm text-gray-600 self-center mr-2">{t('grantFinder.sortBy')}:</label>
                                    <select id="sort-key" value={sortKey} onChange={(e) => setSortKey(e.target.value as SortKey)}
                                        className="bg-white border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-dark">
                                        <option value="relevanceScore">{t('grantFinder.sort.relevance')}</option>
                                        <option value="deadline">{t('grantFinder.sort.deadline')}</option>
                                        <option value="amount">{t('grantFinder.sort.amount')}</option>
                                        <option value="geography">{t('grantFinder.sort.geography')}</option>
                                    </select>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {sortedGrants.map((grant, index) => (
                                        <div key={`${grant.grantTitle}-${index}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col transition-all hover:shadow-md">
                                            <div className="flex-grow">
                                                <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                                                    <a href={grant.link} target="_blank" rel="noopener noreferrer" className="hover:underline flex-1 min-w-0">
                                                        <h4 className="text-lg font-bold text-primary truncate" title={grant.grantTitle}>{grant.grantTitle}</h4>
                                                    </a>
                                                    {grant.relevanceScore != null && <RelevanceBadge score={grant.relevanceScore} />}
                                                </div>
                                                <p className="text-sm text-gray-500 mb-2">{t('grantFinder.from')} {grant.fundingBody}</p>
                                                <p className="text-sm font-semibold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-md self-start mb-4">{t('grantFinder.deadlineLabel')}: {grant.deadline}</p>
                                                <div className="space-y-3 text-sm">
                                                    <p><strong className="text-gray-700">{t('grantFinder.summaryLabel')}:</strong> {grant.summary}</p>
                                                    {grant.amount && grant.amount !== 'Not specified' && <p><strong className="text-gray-700">{t('grantFinder.sort.amount')}:</strong> {grant.amount}</p>}
                                                    {grant.geography && grant.geography !== 'Not specified' && <p><strong className="text-gray-700">{t('grantFinder.sort.geography')}:</strong> {grant.geography}</p>}
                                                    {grant.requirementDocuments && grant.requirementDocuments.length > 0 && (
                                                        <div>
                                                            <strong className="text-gray-700">{t('grantFinder.documents')}:</strong>
                                                            <ul className="list-disc list-inside mt-1 space-y-1">
                                                                {grant.requirementDocuments.map((doc, i) => (
                                                                    <li key={i} className="truncate">
                                                                        <a href={doc.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline" title={doc.title}>{doc.title}</a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-2 gap-2">
                                                <button onClick={() => onSaveGrant(grant)} disabled={isGrantSaved(grant)} className="col-span-2 text-center font-semibold py-2 px-4 rounded-md transition-colors bg-purple-600 text-white hover:bg-purple-700 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed">{isGrantSaved(grant) ? t('grantFinder.saved') : t('grantFinder.save')}</button>
                                                <button onClick={() => setSelectedGrant(grant)} disabled={isQuotaExhausted} className="col-span-2 text-center bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">{t('grantFinder.useForProposal')}</button>
                                                <button onClick={() => onAnalyzeGrant(grant)} disabled={!grant.link || isQuotaExhausted} className="col-span-2 text-center bg-gray-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">{t('grantFinder.analyze')}</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            rawTextResult ? (
                                <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                    <h4 className="font-semibold text-dark mb-2">{t('grantFinder.parseErrorTitle')}</h4>
                                    <p className="text-sm text-gray-500 mb-4">{t('grantFinder.parseErrorSubtitle')}</p>
                                    <pre className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md text-sm text-gray-700 overflow-x-auto">{rawTextResult}</pre>
                                </div>
                            ) : (
                                <div className="text-center text-gray-500 py-10 bg-gray-50 rounded-lg">
                                    <p>{t('grantFinder.crateEmpty')}</p>
                                </div>
                            )
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default GrantFinderPage;
