

import React, { useState } from 'react';
import { useLanguage, ZeroWasteAdviceOutput, ContentGenerationResult, ZeroWasteProduct } from '../types';
import { marked } from 'marked';

// Helper component for clickable example prompts
const ExamplePrompts: React.FC<{ prompts: string[], onPromptClick: (prompt: string) => void, t: (key: string) => string }> = ({ prompts, onPromptClick, t }) => {
    if (!prompts || prompts.length === 0) return null;
    return (
        <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-xs text-gray-500 font-medium self-center">{t('examplePrompts.try')}</span>
            {prompts.map((prompt, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => onPromptClick(prompt)}
                    className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full hover:bg-primary-100 hover:text-primary-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-200 border border-primary-100"
                >
                    {prompt}
                </button>
            ))}
        </div>
    );
};

interface ZeroWastePageProps {
  onGetAdvice: (question: string) => void;
  isGettingAdvice: boolean;
  adviceResult: ZeroWasteAdviceOutput | null;
  adviceError: string | null;
  
  onGenerateContent: (topic: string, format: 'YouTube' | 'Book') => void;
  isGeneratingContent: boolean;
  contentResult: ContentGenerationResult | null;
  contentError: string | null;
  isQuotaExhausted: boolean;
}

type Tab = 'coach' | 'creator' | 'toolkit';

const PYTHON_EPUB_CODE = `from ebooklib import epub

def create_standard_ebook(book_title, author_name, chapters_data):
    book = epub.EpubBook()
    book.set_identifier('id123456')
    book.set_title(book_title)
    book.set_language('en')
    book.add_author(author_name)

    spine_content = []
    toc_list = []

    for index, (title, content) in enumerate(chapters_data):
        file_name = f'chap_{index+1}.xhtml'
        c = epub.EpubHtml(title=title, file_name=file_name, lang='en')
        c.content = f'<h1>{title}</h1><p>{content}</p>'
        book.add_item(c)
        toc_list.append(c)
        spine_content.append(c)

    book.toc = (tuple(toc_list))
    book.add_item(epub.EpubNcx())
    book.add_item(epub.EpubNav())
    book.spine = ['nav'] + spine_content
    
    epub.write_epub(f'{book_title}.epub', book, {})
    print(f"Success! Created: {book_title}.epub")`;

const ZeroWastePage: React.FC<ZeroWastePageProps> = ({
  onGetAdvice,
  isGettingAdvice,
  adviceResult,
  adviceError,
  onGenerateContent,
  isGeneratingContent,
  contentResult,
  contentError,
  isQuotaExhausted
}) => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<Tab>('coach');
  const [coachQuery, setCoachQuery] = useState('');
  const [creatorTopic, setCreatorTopic] = useState('');
  const [creatorFormat, setCreatorFormat] = useState<'YouTube' | 'Book'>('YouTube');
  const [showCode, setShowCode] = useState(false);

  const handleCoachSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (coachQuery.trim()) {
      onGetAdvice(coachQuery);
    }
  };

  const handleCreatorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (creatorTopic.trim()) {
      onGenerateContent(creatorTopic, creatorFormat);
    }
  };

  const handleDownloadMarkdown = () => {
    if (!contentResult) return;
    const element = document.createElement("a");
    const file = new Blob([contentResult.content], {type: 'text/markdown'});
    element.href = URL.createObjectURL(file);
    element.download = `${contentResult.title.replace(/\s+/g, '_')}_Manuscript.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const handleCopyCode = () => {
      navigator.clipboard.writeText(PYTHON_EPUB_CODE);
      alert("Python code copied to clipboard!");
  };

  const DifficultyBadge = ({ level }: { level: string }) => {
    const colors: {[key: string]: string} = {
      'very-easy': 'bg-green-100 text-green-800 border-green-200',
      'easy': 'bg-blue-100 text-blue-800 border-blue-200',
      'medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'hard': 'bg-red-100 text-red-800 border-red-200'
    };
    return <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${colors[level] || 'bg-gray-100 text-gray-800'}`}>{level}</span>
  };

  return (
    <section id="zero-waste" className="py-16 sm:py-24 animate-fade-in min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            {t('zeroWastePage.title')}
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('zeroWastePage.subtitle')}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
            <div className="bg-white p-1.5 rounded-xl inline-flex shadow-sm border border-gray-200 flex-wrap justify-center">
                <button
                    onClick={() => setActiveTab('coach')}
                    className={`px-6 py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${activeTab === 'coach' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-primary hover:bg-gray-50'}`}
                >
                    {t('zeroWastePage.tabCoach')}
                </button>
                <button
                    onClick={() => setActiveTab('creator')}
                    className={`px-6 py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${activeTab === 'creator' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-primary hover:bg-gray-50'}`}
                >
                    {t('zeroWastePage.tabCreator')}
                </button>
                <button
                    onClick={() => setActiveTab('toolkit')}
                    className={`px-6 py-3 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 ${activeTab === 'toolkit' ? 'bg-primary text-white shadow-md' : 'text-gray-500 hover:text-primary hover:bg-gray-50'}`}
                >
                    {t('zeroWastePage.tabToolkit')}
                </button>
            </div>
        </div>

        {/* Tab Content: Coach */}
        {activeTab === 'coach' && (
            <div className="animate-fade-in">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-10 max-w-3xl mx-auto shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">{t('zeroWastePage.coach.title')}</h2>
                    </div>
                    <p className="text-gray-600 mb-8 text-base leading-relaxed">{t('zeroWastePage.coach.description')}</p>
                    
                    <form onSubmit={handleCoachSubmit} className="space-y-5">
                        <div className="relative">
                            <textarea
                                value={coachQuery}
                                onChange={(e) => setCoachQuery(e.target.value)}
                                placeholder={t('zeroWastePage.coach.placeholder')}
                                className="w-full bg-white border border-gray-300 rounded-xl p-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400 text-lg transition-shadow shadow-sm"
                                rows={4}
                            />
                        </div>
                         <ExamplePrompts 
                            prompts={t('examplePrompts.zeroWaste')} 
                            onPromptClick={setCoachQuery} 
                            t={t} 
                        />
                        <button 
                            type="submit" 
                            disabled={isGettingAdvice || isQuotaExhausted || !coachQuery.trim()}
                            className="w-full py-4 bg-primary text-white font-bold text-lg rounded-xl hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary/30 transform hover:-translate-y-0.5 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                        >
                            {isGettingAdvice ? (
                                <span className="flex items-center justify-center gap-2">
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                                    {t('wasteSiteAnalysisPage.generating')}
                                </span>
                            ) : t('zeroWastePage.coach.button')}
                        </button>
                    </form>
                </div>

                {adviceError && <div className="mt-8 text-red-600 p-4 bg-red-50 border border-red-200 rounded-xl max-w-3xl mx-auto shadow-sm">{adviceError}</div>}
                
                {adviceResult && (
                    <div className="mt-10 max-w-3xl mx-auto space-y-6">
                        <div className="bg-white p-8 rounded-2xl border border-primary-100 shadow-lg">
                            <h3 className="text-xl font-bold text-primary-800 mb-3 flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                                Summary
                            </h3>
                            <p className="text-gray-700 leading-relaxed text-lg">{adviceResult.summary}</p>
                        </div>
                        
                        <div className="grid gap-4">
                            {adviceResult.tips?.map((tip, idx) => (
                                <div key={idx} className="bg-white border border-gray-200 p-6 rounded-2xl hover:border-primary/50 transition-all shadow-sm hover:shadow-md group">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
                                        <h4 className="font-bold text-lg text-gray-900 group-hover:text-primary transition-colors">{idx + 1}. {tip.title}</h4>
                                        <div className="flex gap-2 flex-wrap">
                                            <DifficultyBadge level={tip.difficulty} />
                                            <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-600 border border-gray-200 rounded-full font-medium whitespace-nowrap">{t('zeroWastePage.coach.cost')}: {tip.estimatedCost}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">{tip.description}</p>
                                    
                                    <a 
                                        href={language === 'fa' 
                                            ? `https://www.google.com/search?q=${encodeURIComponent("خرید " + tip.title + " پسماند صفر")}`
                                            : `https://www.amazon.com/s?k=${encodeURIComponent(tip.title + " zero waste kit")}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-700 transition-colors"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                        {t('zeroWastePage.coach.findKit')}
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        )}

        {/* Tab Content: Creator */}
        {activeTab === 'creator' && (
             <div className="animate-fade-in space-y-20">
                
                {/* 1. Intro & Concept */}
                <div className="max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                        {t('zeroWastePage.creator.title')}
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                        {t('zeroWastePage.creator.intro')}
                    </p>
                </div>

                {/* 2. How It Works - Steps */}
                <div className="max-w-5xl mx-auto">
                    <h3 className="text-2xl font-bold text-gray-900 text-center mb-12 relative inline-block w-full">
                        <span className="relative z-10 bg-gray-50 px-4">{t('zeroWastePage.creator.howItWorksTitle')}</span>
                        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-300 -z-0"></div>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {t('zeroWastePage.creator.steps')?.map((step: any, i: number) => (
                            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg relative group hover:-translate-y-1 transition-transform duration-300">
                                <div className="absolute -top-5 -left-5 w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-xl shadow-lg rotate-3 group-hover:rotate-6 transition-transform">
                                    {i + 1}
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 mb-3 mt-2">{step.title}</h4>
                                <p className="text-gray-600 leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Creation Options - Cards */}
                <div className="max-w-5xl mx-auto">
                     <h3 className="text-2xl font-bold text-gray-900 text-center mb-12 relative inline-block w-full">
                        <span className="relative z-10 bg-gray-50 px-4">{t('zeroWastePage.creator.optionsTitle')}</span>
                        <div className="absolute top-1/2 left-0 w-full h-px bg-gray-300 -z-0"></div>
                     </h3>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-red-100 shadow-md hover:shadow-xl hover:border-red-200 transition-all group">
                             <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">📹</div>
                             <h4 className="text-xl font-bold text-gray-900 mb-2">{t('zeroWastePage.creator.options')?.[0]?.title}</h4>
                             <p className="text-sm text-gray-600 leading-relaxed">{t('zeroWastePage.creator.options')?.[0]?.desc}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-blue-100 shadow-md hover:shadow-xl hover:border-blue-200 transition-all group">
                             <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">📘</div>
                             <h4 className="text-xl font-bold text-gray-900 mb-2">{t('zeroWastePage.creator.options')?.[1]?.title}</h4>
                             <p className="text-sm text-gray-600 leading-relaxed">{t('zeroWastePage.creator.options')?.[1]?.desc}</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-yellow-100 shadow-md hover:shadow-xl hover:border-yellow-200 transition-all group">
                             <div className="w-14 h-14 bg-yellow-50 rounded-full flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🎨</div>
                             <h4 className="text-xl font-bold text-gray-900 mb-2">{t('zeroWastePage.creator.options')?.[2]?.title}</h4>
                             <p className="text-sm text-gray-600 leading-relaxed">{t('zeroWastePage.creator.options')?.[2]?.desc}</p>
                        </div>
                     </div>
                </div>

                {/* 4. Why This Matters */}
                <div className="max-w-4xl mx-auto bg-primary-50 rounded-3xl p-8 sm:p-10 border border-primary-100">
                    <h3 className="text-2xl font-bold text-primary-900 text-center mb-8">{t('zeroWastePage.creator.whyTitle')}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {t('zeroWastePage.creator.benefits')?.map((benefit: string, i: number) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className="mt-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                </div>
                                <span className="text-gray-800 font-medium">{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 5. The Tool (CTA Section) */}
                <div id="creator-tool" className="bg-gradient-to-br from-purple-700 to-indigo-800 rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto shadow-2xl relative overflow-hidden text-white">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-pink-500/20 rounded-full blur-3xl"></div>
                    
                    <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center relative z-10">{t('zeroWastePage.creator.ctaTitle')}</h2>
                    
                    <form onSubmit={handleCreatorSubmit} className="space-y-8 relative z-10">
                        <div>
                            <label className="block text-sm font-bold text-purple-100 mb-2 uppercase tracking-wide">{t('zeroWastePage.creator.topicLabel')}</label>
                            <input
                                type="text"
                                value={creatorTopic}
                                onChange={(e) => setCreatorTopic(e.target.value)}
                                placeholder={t('zeroWastePage.creator.topicPlaceholder')}
                                className="w-full bg-white border-2 border-purple-400/30 rounded-xl p-4 text-gray-900 focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-white placeholder-gray-500 text-lg shadow-inner"
                            />
                             <div className="mt-3">
                                 <ExamplePrompts 
                                    prompts={t('examplePrompts.ecoCreator')} 
                                    onPromptClick={setCreatorTopic} 
                                    t={t} 
                                />
                             </div>
                        </div>

                        <div>
                             <label className="block text-sm font-bold text-purple-100 mb-3 uppercase tracking-wide">{t('zeroWastePage.creator.formatLabel')}</label>
                             <div className="grid grid-cols-2 gap-4">
                                <button
                                    type="button"
                                    onClick={() => setCreatorFormat('YouTube')}
                                    className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${creatorFormat === 'YouTube' ? 'bg-white text-purple-900 border-white shadow-lg transform scale-[1.02]' : 'bg-purple-900/40 border-purple-500/50 text-purple-200 hover:bg-purple-900/60'}`}
                                >
                                    <span className="text-3xl block mb-2">📹</span>
                                    <span className="text-sm font-bold">{t('zeroWastePage.creator.formatYouTube')}</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCreatorFormat('Book')}
                                    className={`p-4 rounded-xl border-2 text-center transition-all duration-200 ${creatorFormat === 'Book' ? 'bg-white text-purple-900 border-white shadow-lg transform scale-[1.02]' : 'bg-purple-900/40 border-purple-500/50 text-purple-200 hover:bg-purple-900/60'}`}
                                >
                                    <span className="text-3xl block mb-2">📚</span>
                                    <span className="text-sm font-bold">{t('zeroWastePage.creator.formatBook')}</span>
                                </button>
                             </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={isGeneratingContent || isQuotaExhausted || !creatorTopic.trim()}
                            className="w-full py-4 bg-gradient-to-r from-pink-500 to-orange-400 text-white font-extrabold text-xl rounded-xl hover:from-pink-600 hover:to-orange-500 transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isGeneratingContent ? (
                                <span className="flex items-center justify-center gap-2">
                                     <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"/>
                                     {t('wasteSiteAnalysisPage.generating')}
                                </span>
                            ) : t('zeroWastePage.creator.button')}
                        </button>
                    </form>
                </div>

                {/* Results Section */}
                {contentError && <div className="mt-8 text-red-600 p-4 bg-red-50 border border-red-200 rounded-xl max-w-3xl mx-auto shadow-sm">{contentError}</div>}
                
                {contentResult && (
                    <div className="mt-16 max-w-4xl mx-auto animate-fade-in pb-12">
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                            <div className="bg-gray-900 p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mt-20 -mr-20 blur-3xl"></div>
                                <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white shadow-sm">{contentResult.platform} Plan</span>
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-bold leading-tight">{contentResult.title}</h3>
                                    </div>
                                    <button 
                                        onClick={handleDownloadMarkdown}
                                        className="px-6 py-2 bg-white text-gray-900 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-md flex items-center gap-2 text-sm"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                        Download Manuscript
                                    </button>
                                </div>
                            </div>
                            
                            <div className="p-8 sm:p-12 prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700">
                                <div className="whitespace-pre-wrap font-serif leading-loose">{contentResult.content}</div>
                            </div>
                            
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 border-t border-green-100">
                                <h4 className="font-bold text-green-800 mb-6 flex items-center gap-2 text-xl">
                                    <span className="text-2xl">💰</span> {t('zeroWastePage.creator.monetizationTitle')}
                                </h4>
                                <ul className="space-y-3">
                                    {contentResult.monetizationTips?.map((tip, i) => (
                                        <li key={i} className="flex items-start gap-3 text-green-900 text-lg">
                                            <span className="mt-1.5 w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                                            <span>{tip}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Advanced: Python Code Section */}
                             <div className="bg-gray-800 p-8 border-t border-gray-700">
                                <button 
                                    onClick={() => setShowCode(!showCode)}
                                    className="flex items-center justify-between w-full text-left"
                                >
                                    <div className="flex items-center gap-2 text-gray-300">
                                        <span className="text-2xl">🐍</span> 
                                        <div>
                                            <h4 className="font-bold text-white text-lg">Developer Tools: Create Standard EPUB</h4>
                                            <p className="text-sm text-gray-400">Use this Python code to convert your story into a professional eBook.</p>
                                        </div>
                                    </div>
                                    <svg className={`w-6 h-6 text-gray-400 transform transition-transform ${showCode ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </button>
                                
                                {showCode && (
                                    <div className="mt-6 relative">
                                        <div className="absolute top-4 right-4">
                                            <button 
                                                onClick={handleCopyCode}
                                                className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded hover:bg-gray-600 transition-colors"
                                            >
                                                Copy Code
                                            </button>
                                        </div>
                                        <pre className="bg-gray-900 p-6 rounded-lg overflow-x-auto text-sm text-green-400 font-mono border border-gray-700">
                                            <code>{PYTHON_EPUB_CODE}</code>
                                        </pre>
                                        <p className="mt-4 text-xs text-gray-500">
                                            Requires <code>pip install EbookLib</code>. This code takes the text generated above and compiles it into a .epub file readable by Kindle, Apple Books, and other readers.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
             </div>
        )}

        {/* Tab Content: Toolkit */}
        {activeTab === 'toolkit' && (
            <div className="animate-fade-in space-y-12">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900">{t('zeroWastePage.toolkit.title')}</h2>
                    <p className="text-lg text-gray-600 mt-4">{t('zeroWastePage.toolkit.subtitle')}</p>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {t('zeroWastePage.toolkit.products')?.map((product: ZeroWasteProduct, idx: number) => (
                        <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                            <div className="mb-4">
                                <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 text-xs font-bold uppercase tracking-wider rounded-full mb-2">
                                    {product.part}
                                </span>
                                <h3 className="text-xl font-bold text-gray-900 leading-tight">{product.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                            </div>
                            <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
                            
                            <div className="border-t border-gray-100 pt-4 mt-auto">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-lg font-bold text-gray-900">{product.price}</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-4 bg-gray-50 p-2 rounded">🎯 {product.goal}</p>
                                
                                {language === 'fa' ? (
                                    <div className="grid grid-cols-2 gap-2">
                                         <a 
                                            href={`https://www.digikala.com/search/?q=${encodeURIComponent(product.searchTerm)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="col-span-1 text-center py-2.5 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-colors text-sm"
                                        >
                                            دیجی‌کالا
                                        </a>
                                        <a 
                                            href={`https://torob.com/search/?query=${encodeURIComponent(product.searchTerm)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="col-span-1 text-center py-2.5 bg-white border border-red-500 text-red-500 hover:bg-red-50 font-bold rounded-lg transition-colors text-sm"
                                        >
                                            ترب
                                        </a>
                                         <a 
                                            href={`https://www.google.com/search?q=${encodeURIComponent(product.searchTerm + " خرید")}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="col-span-2 text-center py-1 text-gray-500 text-xs hover:text-gray-800"
                                        >
                                            جستجو در گوگل
                                        </a>
                                    </div>
                                ) : (
                                    <a 
                                        href={`https://www.amazon.com/s?k=${encodeURIComponent(product.searchTerm)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center py-2.5 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M15.54 11.237c-.742-1.396-1.558-2.613-2.062-3.137-.47-.49-1.29-1.104-2.146-1.104-1.396 0-2.31 1.38-2.31 2.923 0 1.944 1.144 3.738 2.622 4.108 1.48.37 2.65-.678 3.896-2.79zM10.8 13.3c-1.353-.336-1.802-1.52-1.802-2.38 0-1.01.59-1.576 1.054-1.576.453 0 .742.33 1.042.825.485.8 1.08 1.93 1.428 2.585-.615.42-1.13.59-1.722.545zm8.995 2.19c-.38-.28-1.57-1.106-2.646-1.865-.63-.444-1.282-.904-1.777-1.178.694-1.258 1.34-3.165 1.34-4.523 0-2.382-1.688-4.42-4.17-4.42-2.142 0-3.692 1.83-3.692 4.384 0 2.644 1.764 4.886 4.35 5.534.69.173 1.352.128 1.943-.07-1.298 2.37-3.953 4.195-6.84 4.223-1.46.013-2.66-.46-2.66-.46s.528 1.258 2.583 1.545c2.478.347 5.613-1.196 7.425-4.49 1.597 1.057 2.32 1.54 2.32 1.54s.584-.666 1.625-2.06c.002-.002-.422.36-.8 1.442z"/></svg>
                                        {t('zeroWastePage.toolkit.findOnAmazon')}
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Implementation Steps */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('zeroWastePage.toolkit.implementation.title')}</h3>
                    <div className="relative border-l-2 border-primary-200 ml-3 space-y-8">
                        {t('zeroWastePage.toolkit.implementation.steps')?.map((step: any, idx: number) => (
                            <div key={idx} className="relative pl-8">
                                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-white shadow-sm"></span>
                                <h4 className="font-bold text-lg text-gray-900">{step.phase}</h4>
                                <p className="text-gray-600 mt-1">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Search Tips */}
                <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">{t('zeroWastePage.toolkit.searchTips.title')}</h3>
                    <p className="text-blue-700 mb-4">{t('zeroWastePage.toolkit.searchTips.description')}</p>
                    <div className="flex flex-wrap gap-3">
                        {t('zeroWastePage.toolkit.searchTips.tips')?.map((tip: string, idx: number) => (
                            <span key={idx} className="bg-white px-4 py-2 rounded-lg text-blue-800 text-sm font-mono border border-blue-200 shadow-sm">
                                "{tip}"
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        )}

      </div>
    </section>
  );
};

export default ZeroWastePage;
