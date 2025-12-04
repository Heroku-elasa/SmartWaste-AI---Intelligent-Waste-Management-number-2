

import React from 'react';
import { useLanguage, Page } from '../types';

interface HomePageProps {
    setPage: (page: Page) => void;
}

const ServiceIcon: React.FC<{ page: Page }> = ({ page }) => {
    const icons: { [key in Page]?: React.ReactNode } = {
        waste_collection: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
        smart_dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
        waste_site_analysis: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
        impact_reporter: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
        recycling_calculator: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M12 21a9 9 0 110-18 9 9 0 010 18z" /></svg>,
        grant_finder: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.5A6.5 6.5 0 1012 5.5a6.5 6.5 0 000 13zM12 18.5v2.5" /></svg>,
        supplier_finder: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
        waste_news: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3h2m-4 3V4m0 0H9m4 0h2" /></svg>,
        ai_researcher: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M4 17v4M2 19h4M17 3v4M15 5h4M18 17v4M16 19h4" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17.111a5 5 0 110-10.222 5 5 0 010 10.222z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 12v.01" /></svg>,
        ai_assistant: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
        zero_waste: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
        real_time_dashboard: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>,
    };
    return icons[page] || null;
};


const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  const { t } = useLanguage();
  const servicesData = t('homeServices');

  return (
    <div className="animate-fade-in text-dark">
      {/* Hero Section */}
      <section className="relative bg-light pt-24 pb-20 lg:pt-32 lg:pb-28 flex items-center justify-center text-center overflow-hidden">
        <div className="z-10 p-4 space-y-6 container mx-auto">
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-dark"
            dangerouslySetInnerHTML={{ __html: t('hero.title') }}
          />
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">{t('hero.subtitle')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button onClick={() => setPage('waste_collection')} className="px-8 py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-600 transition-colors text-lg shadow-lg shadow-primary/20">
                {t('hero.button1')}
              </button>
              <button onClick={() => setPage('smart_dashboard')} className="px-8 py-3 bg-white border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary-50 transition-colors text-lg shadow-sm">
                {t('hero.button2')}
              </button>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{servicesData.title}</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">{servicesData.subtitle}</p>
            </div>
            <div className="space-y-12">
                {servicesData.categories.map((category: any, catIndex: number) => (
                    <div key={catIndex}>
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">{category.name}</h3>
                            <div className="w-20 h-1 bg-gradient-to-r from-primary-400 to-primary-500 rounded-full mx-auto"></div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
                            {category.services.map((service: any) => (
                                <button key={service.page} onClick={() => setPage(service.page)} className="group relative bg-white border border-gray-200 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 text-center">
                                    <div className="flex justify-center mb-3 text-primary-600">
                                        <ServiceIcon page={service.page}/>
                                    </div>
                                    <h4 className="font-bold text-sm text-gray-900 mb-1 line-clamp-2">{service.name}</h4>
                                    <p className="text-xs text-gray-600 line-clamp-2 leading-tight">{service.description}</p>
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-primary-500/0 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300"></div>
                                    <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary-600"><path d="m9 18 6-6-6-6"/></svg>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;