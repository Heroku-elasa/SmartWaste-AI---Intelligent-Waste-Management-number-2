import React, { useState } from 'react';
import { useLanguage, Supplier } from '../types';

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

interface SupplierFinderPageProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  error: string | null;
  results: Supplier[] | null;
  isQuotaExhausted: boolean;
}

const SupplierCard: React.FC<{ supplier: Supplier }> = ({ supplier }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-dark/70 border border-secondary/30 rounded-lg p-6 shadow-lg backdrop-blur-sm animate-fade-in flex flex-col h-full">
            <div className="flex-grow">
                <h3 className="text-xl font-bold text-light">{supplier.name}</h3>
                <p className="text-sm text-gray-300 mt-3">{supplier.description}</p>
            </div>
            <div className="mt-6">
                <a 
                    href={supplier.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="block text-center w-full py-2 px-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-700 transition-colors"
                >
                    {t('supplierFinderPage.visitWebsite')}
                </a>
            </div>
        </div>
    );
};

const SupplierFinderPage: React.FC<SupplierFinderPageProps> = ({
  onSearch,
  isLoading,
  error,
  results,
  isQuotaExhausted,
}) => {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <section id="supplier-finder" className="py-16 sm:py-24 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-light tracking-tight">
            {t('supplierFinderPage.title')}
          </h1>
          <p className="mt-4 text-lg text-gray-300">
            {t('supplierFinderPage.subtitle')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-12 max-w-2xl mx-auto">
            <div className="flex items-center bg-dark/50 border border-secondary/30 rounded-lg shadow-md p-2">
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('supplierFinderPage.searchPlaceholder')}
                    className="w-full bg-transparent text-light placeholder-gray-400 px-4 py-2 focus:outline-none"
                    aria-label={t('supplierFinderPage.searchPlaceholder')}
                />
                <button 
                    type="submit" 
                    disabled={isLoading || isQuotaExhausted || !query.trim()} 
                    className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700 transition-colors disabled:bg-secondary disabled:cursor-not-allowed"
                >
                    {isLoading ? t('supplierFinderPage.searching') : t('supplierFinderPage.searchButton')}
                </button>
            </div>
             <ExamplePrompts 
                prompts={t('examplePrompts.supplierFinder')} 
                onPromptClick={setQuery} 
                t={t} 
            />
        </form>

        <div className="mt-16">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-primary"></div>
              <p className="mt-4 text-gray-300">{t('supplierFinderPage.searching')}</p>
            </div>
          )}
          {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-md max-w-3xl mx-auto">{error}</div>}
          
          {!isLoading && !results && !error && (
            <div className="text-center py-10 text-gray-500 bg-dark/30 rounded-lg max-w-3xl mx-auto">
              <p>{t('supplierFinderPage.placeholder')}</p>
            </div>
          )}

          {results && (
            <div className="space-y-10">
              <h2 className="text-3xl font-bold text-light text-center">{t('supplierFinderPage.resultsTitle')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {results.map((supplier, index) => (
                    <SupplierCard key={index} supplier={supplier} />
                 ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SupplierFinderPage;