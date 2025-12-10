

import React, { useRef } from 'react';
import { useLanguage, WasteSiteAnalysisInput, WasteSiteAnalysisResult } from '../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

// Helper component for clickable example prompts
const ExamplePrompts: React.FC<{ prompts: string[], onPromptClick: (prompt: string) => void, t: (key: string) => string }> = ({ prompts, onPromptClick, t }) => {
    if (!prompts || prompts.length === 0) return null;
    return (
        <div className="flex flex-wrap items-center gap-2 mt-2">
            <span className="text-xs text-gray-500 font-medium self-center">{t('examplePrompts.try')}</span>
            {prompts.map((prompt, index) => (
                <button
                    key={index}
                    type="button"
                    onClick={() => onPromptClick(prompt)}
                    className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-200"
                >
                    {prompt}
                </button>
            ))}
        </div>
    );
};


// --- Sub-components for Results ---
const CustomTooltip = ({ active, payload, label, unit }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="p-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-md shadow-lg">
                <p className="label text-sm text-dark">{`${label}`}</p>
                <p className="intro text-xs text-primary">{`${payload[0].value.toLocaleString()} ${unit}`}</p>
            </div>
        );
    }
    return null;
};

// --- Main Page Component ---
interface WasteSiteAnalysisPageProps {
  onGenerate: () => void;
  isLoading: boolean;
  error: string | null;
  inputs: WasteSiteAnalysisInput;
  setInputs: (value: React.SetStateAction<WasteSiteAnalysisInput>) => void;
  result: WasteSiteAnalysisResult | null;
  isQuotaExhausted: boolean;
}

const WasteSiteAnalysisPage: React.FC<WasteSiteAnalysisPageProps> = ({
  onGenerate,
  isLoading,
  error,
  inputs,
  setInputs,
  result,
  isQuotaExhausted,
}) => {
  const { t, language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputs.locationText.trim()) {
      alert(t('wasteSiteAnalysisPage.validationError'));
      return;
    }
    onGenerate();
  };
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = (reader.result as string).split(',')[1];
          setInputs(prev => ({
            ...prev,
            locationImage: {
              base64: base64String,
              mimeType: file.type,
            }
          }));
        };
        reader.readAsDataURL(file);
      }
  };
  
  const removeImage = () => {
    setInputs(prev => ({ ...prev, locationImage: null }));
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  return (
    <section id="waste-site-analysis" className="py-16 sm:py-24 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-dark tracking-tight">{t('wasteSiteAnalysisPage.title')}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mt-12">
          {/* Left Column: Form */}
          <div className="md:sticky top-28">
            <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-dark">{t('wasteSiteAnalysisPage.formTitle')}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="locationText" className="block text-sm font-medium text-gray-700">{t('wasteSiteAnalysisPage.locationLabel')}</label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none rtl:left-auto rtl:right-0 rtl:pl-0 rtl:pr-3">
                      <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input id="locationText" type="text" value={inputs.locationText} onChange={(e) => setInputs(prev => ({...prev, locationText: e.target.value}))} className="block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm py-2 pl-10 pr-3 rtl:pl-3 rtl:pr-10 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-dark placeholder-gray-500" placeholder={t('wasteSiteAnalysisPage.locationPlaceholder')} />
                  </div>
                   <ExamplePrompts 
                    prompts={t('examplePrompts.wasteSiteAnalysisLocation')} 
                    onPromptClick={(p) => setInputs(prev => ({...prev, locationText: p}))} 
                    t={t} 
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">{t('wasteSiteAnalysisPage.descriptionLabel')}</label>
                  <textarea id="description" rows={4} value={inputs.description} onChange={(e) => setInputs(prev => ({...prev, description: e.target.value}))} className="mt-1 block w-full bg-gray-50 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-dark placeholder-gray-500" placeholder={t('wasteSiteAnalysisPage.descriptionPlaceholder')} />
                   <ExamplePrompts 
                    prompts={t('examplePrompts.wasteSiteAnalysisDescription')} 
                    onPromptClick={(p) => setInputs(prev => ({...prev, description: p}))} 
                    t={t} 
                  />
                </div>
                
                <div>
                    <input type="file" id="env-photo" accept="image/*" className="hidden" onChange={handleImageUpload} ref={fileInputRef} />
                    <label htmlFor="env-photo" className="w-full cursor-pointer flex items-center justify-center gap-2 py-2 px-4 border border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-primary transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" /></svg>
                      <span>{t('wasteSiteAnalysisPage.uploadPhoto')}</span>
                    </label>
                    {inputs.locationImage && (
                        <div className="mt-3 text-xs text-center text-green-700 bg-green-100 p-2 rounded-md flex justify-between items-center">
                            <span className="truncate pr-2">{t('wasteSiteAnalysisPage.photoUploaded')}</span>
                            <button type="button" onClick={removeImage} title={t('wasteSiteAnalysisPage.removePhoto')} className="text-red-500 hover:text-red-700">&times;</button>
                        </div>
                    )}
                </div>

                <div>
                  <button type="submit" disabled={isLoading || isQuotaExhausted} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                    {isLoading ? t('wasteSiteAnalysisPage.generating') : isQuotaExhausted ? t('quotaErrorModal.title') : t('wasteSiteAnalysisPage.buttonText')}
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          {/* Right Column: Results */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-dark mb-6 text-center md:text-left">{t('wasteSiteAnalysisPage.resultsTitle')}</h3>
            {isLoading && (
              <div className="flex items-center justify-center py-10">
                  <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-primary"></div>
              </div>
            )}
            {error && <div className="text-red-700 p-4 bg-red-100 rounded-md border border-red-300">{error}</div>}
            {!isLoading && !result && !error && (
              <div className="text-center py-10 text-gray-500 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <p>{t('wasteSiteAnalysisPage.placeholder')}</p>
              </div>
            )}
            {result && (
              <div className="space-y-6 animate-fade-in">
                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-primary">{t('wasteSiteAnalysisPage.siteSuitability')}</h4>
                    <p className="text-sm text-gray-700 mt-1">{result.siteSuitability}</p>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                  <h4 className="font-semibold text-primary text-center">{t('wasteSiteAnalysisPage.estimatedDiversion')}</h4>
                  <p className="text-2xl font-bold text-dark mt-1 text-center">{result.estimatedMonthlyDiversion.total}</p>
                  <div className="h-64 w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={result.estimatedMonthlyDiversion?.monthlyBreakdown || []} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                              <XAxis dataKey="month" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                              <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                              <Tooltip content={<CustomTooltip unit="kg" />} cursor={{fill: 'rgba(20, 184, 166, 0.1)'}} />
                              <Bar dataKey="value" name="Diversion" fill="#14B8A6" radius={[4, 4, 0, 0]} />
                          </BarChart>
                      </ResponsiveContainer>
                  </div>
                </div>

                <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                    <h4 className="font-semibold text-primary text-center">{t('wasteSiteAnalysisPage.potentialSavings')}</h4>
                    <p className="text-2xl font-bold text-dark mt-1 text-center">{result.potentialAnnualSavings.total}</p>
                    <div className="h-64 w-full mt-4">
                      <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={result.potentialAnnualSavings?.monthlyBreakdown || []} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                              <XAxis dataKey="month" stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                              <YAxis stroke="#4b5563" fontSize={12} tickLine={false} axisLine={false} />
                              <Tooltip content={<CustomTooltip unit={language === 'fa' ? 'تومان' : '$'} />} cursor={{fill: 'rgba(107, 114, 128, 0.1)'}} />
                              <Bar dataKey="value" name="Savings" fill="#6b7280" radius={[4, 4, 0, 0]} />
                          </BarChart>
                      </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                    <h4 className="font-semibold text-primary mb-2">{t('wasteSiteAnalysisPage.recommendations')}</h4>
                    <div className="space-y-3">
                        {result.recommendations?.map((rec, i) => (
                            <div key={i} className="p-3 bg-white border border-gray-200 rounded-lg text-sm shadow-sm">
                                <p className="font-bold text-dark">{rec.binCount} x {rec.binType}</p>
                                <p className="text-gray-600 text-xs mt-1">{rec.reasoning}</p>
                            </div>
                        ))}
                    </div>
                </div>
                 <div>
                    <h4 className="font-semibold text-primary mb-2">{t('wasteSiteAnalysisPage.logistics')}</h4>
                    <div className="p-4 bg-white border-l-4 border-gray-300 rounded-r-lg shadow-sm">
                        <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm">
                            {result.logisticsConsiderations?.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>
                 </div>

              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WasteSiteAnalysisPage;
