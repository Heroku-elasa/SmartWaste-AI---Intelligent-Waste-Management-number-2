import React, { useState } from 'react';
import { useLanguage, Grant, ApplicationDraft } from '../types';

// Helper component for clickable example prompts
const ExamplePrompts: React.FC<{ prompts: string[], onPromptClick: (prompt: string) => void, t: (key: string) => string, isDark?: boolean }> = ({ prompts, onPromptClick, t, isDark = false }) => {
    if (!prompts || prompts.length === 0) return null;
    const buttonClass = isDark 
        ? "bg-secondary/30 text-gray-200 hover:bg-secondary/50 hover:text-light"
        : "bg-gray-100 text-gray-700 hover:bg-primary-100 hover:text-primary-700";
    const textClass = isDark ? "text-gray-400" : "text-gray-500";
    return (
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
            <span className={`text-xs ${textClass} font-medium self-center`}>{t('examplePrompts.try')}</span>
            {prompts.map((prompt, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => onPromptClick(prompt)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${buttonClass}`}
                >
                    {prompt}
                </button>
            ))}
        </div>
    );
};

interface GrantFinderPageProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  error: string | null;
  results: Grant[] | null;
  isQuotaExhausted: boolean;
  onGenerateApplication: (projectDescription: string, grant: Grant) => void;
  isGeneratingApplication: boolean;
  applicationDraft: ApplicationDraft | null;
  applicationError: string | null;
}

const GrantCard: React.FC<{ grant: Grant, onPrepare: () => void; }> = ({ grant, onPrepare }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-dark/70 border border-secondary/30 rounded-lg p-6 shadow-lg backdrop-blur-sm animate-fade-in flex flex-col h-full">
            <div className="flex-grow">
                <p className="text-sm font-semibold text-primary">{grant.issuingAgency}</p>
                <h3 className="text-xl font-bold text-light mt-1">{grant.name}</h3>
                <p className="text-sm text-gray-300 mt-3">{grant.description}</p>
                 <div className="mt-4 pt-4 border-t border-secondary/20">
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">{t('grantFinderPage.eligibility')}</h4>
                    <p className="text-sm text-gray-300">{grant.eligibility}</p>
                </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row gap-2">
                <a href={grant.link} target="_blank" rel="noopener noreferrer" className="flex-1 text-center py-2 px-4 bg-secondary/50 text-white font-semibold rounded-md hover:bg-secondary/70 transition-colors">
                    {t('grantFinderPage.applyNow')}
                </a>
                 <button onClick={onPrepare} className="flex-1 text-center py-2 px-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-700 transition-colors">
                    {t('grantFinderPage.prepareApplication')}
                </button>
            </div>
        </div>
    );
};

const GrantFinderPage: React.FC<GrantFinderPageProps> = ({
  onSearch,
  isLoading,
  error,
  results,
  isQuotaExhausted,
  onGenerateApplication,
  isGeneratingApplication,
  applicationDraft,
  applicationError,
}) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [selectedGrant, setSelectedGrant] = useState<Grant | null>(null);
  const [projectDescription, setProjectDescription] = useState('');


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
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
                <button onClick={() => { setSelectedGrant(null); }} className="flex items-center gap-2 text-sm text-gray-300 hover:text-light transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" /></svg>
                    {t('grantFinderPage.backToResults')}
                </button>
                <h2 className="text-3xl font-bold text-light text-center mt-4">
                    {t('grantFinderPage.applicationAssistant', { grantName: selectedGrant.name })}
                </h2>
                
                <div className="mt-8 bg-dark/50 rounded-lg p-8 shadow-lg backdrop-blur-sm border border-secondary/20 space-y-6">
                    <div>
                      <label htmlFor="project-description" className="block text-sm font-medium text-gray-300">{t('grantFinderPage.projectDescriptionLabel')}</label>
                      <textarea
                        id="project-description"
                        rows={7}
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        className="mt-1 block w-full bg-secondary/20 border-secondary/30 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-light placeholder-gray-400"
                        placeholder={t('grantFinderPage.projectDescriptionPlaceholder')}
                      />
                       <ExamplePrompts 
                        prompts={t('examplePrompts.grantApplication')} 
                        onPromptClick={setProjectDescription} 
                        t={t} 
                        isDark 
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
                        <p className="mt-4 text-gray-300">{t('grantFinderPage.generatingDraft')}</p>
                      </div>
                    )}
                    {applicationError && <div className="text-red-400 p-4 bg-red-900/50 rounded-md max-w-3xl mx-auto">{applicationError}</div>}
                    
                    {applicationDraft && (
                        <div className="animate-fade-in bg-dark/30 p-8 rounded-lg border border-secondary/20 space-y-10">
                            <h2 className="text-2xl font-bold text-light text-center border-b border-secondary/20 pb-4">{t('grantFinderPage.draftResultsTitle')}</h2>

                            <div>
                                <h3 className="text-lg font-semibold text-primary mb-4">{t('grantFinderPage.businessPlanOutline')}</h3>
                                <div className="space-y-4">
                                {applicationDraft.businessPlanOutline.map((item, i) => (
                                    <div key={i} className="p-4 bg-dark/40 border-l-4 border-secondary rounded-r-lg">
                                        <h4 className="font-bold text-light">{item.section}</h4>
                                        <p className="text-sm text-gray-300 mt-1">{item.content}</p>
                                    </div>
                                ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-primary mb-4">{t('grantFinderPage.applicationSections')}</h3>
                                <div className="space-y-4">
                                {applicationDraft.applicationSections.map((item, i) => (
                                    <div key={i} className="p-4 bg-dark/40 rounded-lg border border-secondary/20">
                                        <h4 className="font-bold text-light">{item.sectionTitle}</h4>
                                        <p className="text-sm text-gray-300 mt-2 whitespace-pre-wrap leading-relaxed">{item.draftedContent}</p>
                                    </div>
                                ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-primary mb-4">{t('grantFinderPage.nextSteps')}</h3>
                                <ul className="list-disc list-inside space-y-2 text-gray-300">
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

  // --- Main Search View ---
  return (
    <section id="grant-finder" className="py-16 sm:py-24 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-light tracking-tight">
            {t('grantFinderPage.title')}
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            {t('grantFinderPage.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-12 max-w-2xl mx-auto">
            <div className="flex items-center bg-dark/50 border border-secondary/30 rounded-lg shadow-md p-2">
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('grantFinderPage.searchPlaceholder')}
                    className="w-full bg-transparent text-light placeholder-gray-400 px-4 py-2 focus:outline-none"
                    aria-label={t('grantFinderPage.searchPlaceholder')}
                />
                <button 
                    type="submit" 
                    disabled={isLoading || isQuotaExhausted || !query.trim()} 
                    className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700 transition-colors disabled:bg-secondary disabled:cursor-not-allowed"
                >
                    {isLoading ? t('grantFinderPage.searching') : t('grantFinderPage.searchButton')}
                </button>
            </div>
            <ExamplePrompts 
                prompts={t('examplePrompts.grantFinder')} 
                onPromptClick={setQuery} 
                t={t} 
                isDark
            />
        </form>

        <div className="mt-16">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-primary"></div>
              <p className="mt-4 text-gray-300">{t('grantFinderPage.searching')}</p>
            </div>
          )}
          {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-md max-w-3xl mx-auto">{error}</div>}
          
          {!isLoading && !results && !error && (
            <div className="text-center py-10 text-gray-500 bg-dark/30 rounded-lg max-w-3xl mx-auto">
              <p>{t('grantFinderPage.placeholder')}</p>
            </div>
          )}

          {results && (
            <div className="space-y-10">
              <h2 className="text-3xl font-bold text-light text-center">{t('grantFinderPage.resultsTitle')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {results.map((grant, index) => (
                    <GrantCard key={index} grant={grant} onPrepare={() => setSelectedGrant(grant)} />
                 ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GrantFinderPage;