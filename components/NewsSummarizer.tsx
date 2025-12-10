
import React, { useState } from 'react';
import { useLanguage, NewsSummaryResult } from '../types';

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

interface WasteNewsPageProps {
    onSearch: (query: string) => void;
    isLoading: boolean;
    error: string | null;
    result: NewsSummaryResult | null;
}

const WasteNewsPage: React.FC<WasteNewsPageProps> = ({ onSearch, isLoading, error, result }) => {
    const { t } = useLanguage();
    const [query, setQuery] = useState('');

    const handleSearch = async (searchQuery: string) => {
        if (!searchQuery.trim()) return;
        setQuery(searchQuery);
        onSearch(searchQuery);
    };
    
    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSearch(query);
    }
    
    const handleRunSuggestedQuery = (suggestedQuery: string) => {
        handleSearch(suggestedQuery);
        window.scrollTo(0, 0);
    }

    return (
        <section id="waste-news" className="py-16 sm:py-24 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                 <div className="text-center">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-light tracking-tight">
                        {t('wasteNewsPage.title')}
                    </h1>
                    <p className="mt-4 text-lg text-gray-300">
                        {t('wasteNewsPage.subtitle')}
                    </p>
                </div>

                <form onSubmit={handleFormSubmit} className="mt-12 max-w-2xl mx-auto">
                    <div className="flex items-center bg-dark/50 border border-secondary/30 rounded-lg shadow-md p-2">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={t('wasteNewsPage.searchPlaceholder')}
                            className="w-full bg-transparent text-light placeholder-gray-400 px-4 py-2 focus:outline-none"
                        />
                        <button type="submit" disabled={isLoading} className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700 transition-colors disabled:bg-secondary disabled:cursor-not-allowed">
                            {isLoading ? t('wasteNewsPage.searching') : t('wasteNewsPage.searchButton')}
                        </button>
                    </div>
                     <ExamplePrompts 
                        prompts={t('examplePrompts.wasteNews')} 
                        onPromptClick={handleSearch} 
                        t={t} 
                    />
                </form>

                <div className="mt-12 bg-dark/30 p-8 rounded-lg min-h-[300px]">
                     {isLoading && (
                        <div className="flex items-center justify-center h-full">
                            <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-primary"></div>
                            <span className="ml-4 text-gray-300">{t('wasteNewsPage.searching')}</span>
                        </div>
                    )}
                    {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-md">{error}</div>}
                    {!isLoading && !result && !error && (
                        <div className="text-center text-gray-500 py-10">
                            <p>{t('wasteNewsPage.placeholder')}</p>
                        </div>
                    )}
                    {result && (
                        <article className="animate-fade-in">
                            <div className="prose prose-invert max-w-none prose-p:text-gray-200 prose-p:leading-relaxed prose-headings:text-light">
                                <p>{result.summary}</p>
                            </div>
                            
                            {result.sources && result.sources.length > 0 && (
                                <div className="mt-10 pt-6 border-t border-secondary/20">
                                    <h3 className="text-lg font-semibold text-gray-200 mb-4">{t('wasteNewsPage.sources')}</h3>
                                    <ul className="space-y-2">
                                        {result.sources.map((source, index) => (
                                            <li key={index} className="flex items-start">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-3 rtl:ml-3 rtl:mr-0 mt-1 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                                  <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l-1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                                                </svg>
                                                <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-sm text-secondary-300 hover:underline hover:text-primary transition-colors truncate">
                                                    {source.title || source.uri}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            
                            {result.suggestedQueries && result.suggestedQueries.length > 0 && (
                                <div className="mt-10 pt-6 border-t border-secondary/20">
                                    <h3 className="text-lg font-semibold text-gray-200 mb-4">{t('wasteNewsPage.relatedTopics')}</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {result.suggestedQueries.map((q, i) => (
                                            <button 
                                                key={i} 
                                                onClick={() => handleRunSuggestedQuery(q)}
                                                className="px-4 py-2 bg-secondary/30 text-gray-200 text-sm font-medium rounded-full hover:bg-secondary/50 hover:text-light transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                                            >
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </article>
                    )}
                </div>
            </div>
        </section>
    );
};

export default WasteNewsPage;
