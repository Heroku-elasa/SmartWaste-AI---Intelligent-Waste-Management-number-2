
import React, { useState } from 'react';
import { useLanguage, EnvironmentalReport } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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

interface ImpactReporterPageProps {
  onGenerate: (description: string) => void;
  isLoading: boolean;
  error: string | null;
  report: EnvironmentalReport | null;
  isQuotaExhausted: boolean;
}

const SustainabilityGauge: React.FC<{ score: number }> = ({ score }) => {
    const data = [
        { name: 'Score', value: score },
        { name: 'Remaining', value: 100 - score },
    ];

    const scoreColorHex = (s: number) => {
        if (s > 80) return '#4ade80'; // Corresponds to Tailwind green-400
        if (s > 60) return '#facc15'; // Corresponds to Tailwind yellow-400
        return '#f87171';   // Corresponds to Tailwind red-400
    };
    
    const color = scoreColorHex(score);

    return (
        <div className="w-full h-full relative">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="80%"
                        startAngle={180}
                        endAngle={0}
                        innerRadius="60%"
                        outerRadius="85%"
                        paddingAngle={0}
                        dataKey="value"
                        stroke="none"
                    >
                        <Cell key={`cell-0`} fill={color} />
                        <Cell key={`cell-1`} fill="rgba(107, 114, 128, 0.3)" />
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center -mt-4">
                <div className="text-center">
                    <span className="text-5xl font-black" style={{ color }}>{score}</span>
                    <span className="text-xl font-medium text-gray-400">/100</span>
                </div>
            </div>
        </div>
    );
};


const ImpactReporterPage: React.FC<ImpactReporterPageProps> = ({
  onGenerate,
  isLoading,
  error,
  report,
  isQuotaExhausted,
}) => {
  const { t } = useLanguage();
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert(t('impactReporterPage.validationError'));
      return;
    }
    onGenerate(description);
  };
  
  const ReportSection: React.FC<{ title: string; children: React.ReactNode, icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="bg-dark/40 p-6 rounded-lg border border-secondary/20">
      <div className="flex items-center mb-3">
        <span className="text-primary text-xl p-2 bg-dark/50 rounded-lg mr-3 rtl:ml-3 rtl:mr-0">{icon}</span>
        <h3 className="text-lg font-semibold text-light">{title}</h3>
      </div>
      <div className="pl-12 rtl:pr-12 text-gray-300 text-sm">{children}</div>
    </div>
  );

  return (
    <section id="impact-reporter" className="py-16 sm:py-24 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-light tracking-tight">
            {t('impactReporterPage.title')}
          </h1>
          <p className="mt-4 text-lg text-gray-300 max-w-3xl mx-auto">
            {t('impactReporterPage.subtitle')}
          </p>
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-dark/50 rounded-lg p-8 shadow-lg backdrop-blur-sm border border-secondary/20 space-y-6">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">{t('impactReporterPage.descriptionLabel')}</label>
              <textarea
                id="description"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full bg-secondary/20 border-secondary/30 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-light placeholder-gray-400"
                placeholder={t('impactReporterPage.descriptionPlaceholder')}
              />
               <ExamplePrompts 
                prompts={t('examplePrompts.impactReporter')} 
                onPromptClick={setDescription} 
                t={t} 
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading || isQuotaExhausted}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 disabled:bg-secondary disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? t('impactReporterPage.generating') : isQuotaExhausted ? t('quotaErrorModal.title') : t('impactReporterPage.buttonText')}
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12">
            {isLoading && (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-primary"></div>
                <p className="mt-4 text-gray-300">{t('impactReporterPage.generating')}</p>
              </div>
            )}
            {error && <div className="text-red-400 p-4 bg-red-900/50 rounded-md max-w-3xl mx-auto">{error}</div>}
            {!isLoading && !report && !error && (
              <div className="text-center py-10 text-gray-500 bg-dark/30 rounded-lg max-w-3xl mx-auto">
                <p>{t('impactReporterPage.placeholder')}</p>
              </div>
            )}
            {report && (
                <div className="animate-fade-in bg-dark/30 p-8 rounded-lg mt-12 border border-secondary/20">
                    <header className="text-center border-b-2 border-dashed border-secondary/20 pb-6 mb-8">
                        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">{t('impactReporterPage.resultsTitle')}</h2>
                        <h3 className="text-2xl font-bold text-light mt-4">{t('impactReporterPage.sustainabilityScore')}</h3>
                        <div className="w-full max-w-xs mx-auto h-48 -mb-8">
                            <SustainabilityGauge score={report.sustainabilityScore} />
                        </div>
                    </header>

                    <div className="space-y-6">
                        <ReportSection title={t('impactReporterPage.executiveSummary')} icon="📝">
                          <p className="leading-relaxed">{report.executiveSummary}</p>
                        </ReportSection>
                        
                        <ReportSection title={t('impactReporterPage.positiveImpacts')} icon="🌱">
                          <ul className="list-disc list-inside space-y-2">
                            {report.positiveImpacts?.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        </ReportSection>

                        <ReportSection title={t('impactReporterPage.potentialRisks')} icon="⚠️">
                          <ul className="list-disc list-inside space-y-2">
                            {report.potentialRisks?.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        </ReportSection>
                        
                        <ReportSection title={t('impactReporterPage.mitigationStrategies')} icon="🛡️">
                          <ul className="list-disc list-inside space-y-2">
                            {report.mitigationStrategies?.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        </ReportSection>
                    </div>
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default ImpactReporterPage;
