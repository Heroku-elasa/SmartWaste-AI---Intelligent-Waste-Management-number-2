import React, { useState } from 'react';
import { useLanguage, RecyclingCalculatorResult } from '../types';

// Helper component for clickable example prompts
const ExamplePrompts: React.FC<{ prompts: string[], onPromptClick: (prompt: string) => void, t: (key: string) => string }> = ({ prompts, onPromptClick, t }) => {
    if (!prompts || prompts.length === 0) return null;
    return (
        <div className="flex flex-wrap items-center gap-2 mt-2">
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

interface RecyclingCalculatorPageProps {
  onCalculate: (monthlyWasteTonnes: number) => void;
  isLoading: boolean;
  error: string | null;
  result: RecyclingCalculatorResult | null;
  isQuotaExhausted: boolean;
}

const RecyclingCalculatorPage: React.FC<RecyclingCalculatorPageProps> = ({
  onCalculate,
  isLoading,
  error,
  result,
  isQuotaExhausted,
}) => {
  const { language, t } = useLanguage();
  const [monthlyWaste, setMonthlyWaste] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const wasteAmount = parseFloat(monthlyWaste);
    if (isNaN(wasteAmount) || wasteAmount <= 0) {
      alert(t('recyclingCalculatorPage.validationError'));
      return;
    }
    onCalculate(wasteAmount);
  };

  const ResultCard: React.FC<{ title: string; value: string | React.ReactNode; isCurrency?: boolean }> = ({ title, value, isCurrency = false }) => (
    <div className="bg-dark/50 p-6 rounded-lg border border-secondary/20 text-center">
        <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">{title}</h3>
        <p className="text-4xl font-extrabold text-light mt-2">
            {isCurrency && (language === 'en' ? '$' : '')}
            {value}
            {isCurrency && (language === 'fa' ? ` ${'تومان'}` : '')}
        </p>
    </div>
  );

  return (
    <section id="recycling-calculator" className="py-16 sm:py-24 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-light tracking-tight">
            {t('recyclingCalculatorPage.title')}
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            {t('recyclingCalculatorPage.subtitle')}
          </p>
        </div>

        <div className="mt-12 max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="bg-dark/50 rounded-lg p-8 shadow-lg backdrop-blur-sm border border-secondary/20 space-y-6">
            <div>
              <label htmlFor="monthly-bill" className="block text-sm font-medium text-gray-300">
                {t('recyclingCalculatorPage.billLabel')}
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  type="number"
                  name="monthly-bill"
                  id="monthly-bill"
                  value={monthlyWaste}
                  onChange={(e) => setMonthlyWaste(e.target.value)}
                  className={`block w-full bg-secondary/20 border-secondary/30 rounded-md py-3 sm:text-sm text-light placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary px-4`}
                  placeholder={t('recyclingCalculatorPage.billPlaceholder')}
                />
              </div>
               <ExamplePrompts 
                prompts={t('examplePrompts.recyclingCalculator')} 
                onPromptClick={setMonthlyWaste} 
                t={t} 
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading || isQuotaExhausted}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 disabled:bg-secondary disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? t('recyclingCalculatorPage.calculating') : isQuotaExhausted ? t('quotaErrorModal.title') : t('recyclingCalculatorPage.buttonText')}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12">
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-primary"></div>
                <p className="mt-4 text-gray-300">{t('recyclingCalculatorPage.calculating')}</p>
              </div>
            )}
            {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-md max-w-3xl mx-auto">{error}</div>}
            {!isLoading && !result && !error && (
              <div className="text-center py-10 text-gray-500 bg-dark/30 rounded-lg max-w-3xl mx-auto">
                <p>{t('recyclingCalculatorPage.placeholder')}</p>
              </div>
            )}
            {result && (
                <div className="animate-fade-in max-w-3xl mx-auto space-y-8">
                    <h2 className="text-2xl font-bold text-light text-center">{t('recyclingCalculatorPage.resultsTitle')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <ResultCard title={t('recyclingCalculatorPage.annualSavings')} value={result.annualLandfillFeeSavings.toLocaleString()} isCurrency />
                        <ResultCard title={t('recyclingCalculatorPage.annualRevenue')} value={result.annualRecyclingRevenue.toLocaleString()} isCurrency />
                    </div>
                     <ResultCard 
                        title={t('recyclingCalculatorPage.totalBenefit')} 
                        value={result.totalAnnualBenefit.toLocaleString()} 
                        isCurrency
                    />
                    <div className="bg-dark/50 p-6 rounded-lg border border-secondary/20">
                        <h3 className="text-sm font-semibold text-gray-200">{t('recyclingCalculatorPage.notes')}</h3>
                        <p className="text-xs text-gray-400 mt-2">{result.notes}</p>
                    </div>
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default RecyclingCalculatorPage;