
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, Page } from '../types';

interface SiteHeaderProps {
    currentPage: Page;
    setPage: (page: Page) => void;
}

interface NavLink {
    key: string;
    text: any;
    action: () => void;
    icon?: React.ReactNode;
    description?: string;
}

interface MobileLink {
    key: string;
    text: any;
    action?: () => void;
    isHeader?: boolean;
}

const SiteHeader: React.FC<SiteHeaderProps> = ({ currentPage, setPage }) => {
  const { language, setLanguage, t } = useLanguage();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSuiteMenuOpen, setIsSuiteMenuOpen] = useState(false);
  
  const langMenuRef = useRef<HTMLDivElement>(null);
  const suiteMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
      if (suiteMenuRef.current && !suiteMenuRef.current.contains(event.target as Node)) {
        setIsSuiteMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handlePageChange = (page: Page) => {
      setPage(page);
      setIsMobileMenuOpen(false);
      setIsSuiteMenuOpen(false);
      window.scrollTo(0, 0);
  }
  
  const mainNavLinks: NavLink[] = [
    { key: 'home', text: t('header.home'), action: () => handlePageChange('home') },
    { key: 'waste_collection', text: t('header.requestWastePickup'), action: () => handlePageChange('waste_collection') },
    { key: 'real_time_dashboard', text: t('header.realTimeDashboard'), action: () => handlePageChange('real_time_dashboard') },
    { key: 'wordpress_dashboard', text: t('header.wpDashboard'), action: () => handlePageChange('wordpress_dashboard') },
  ];

  const analyticsTools: NavLink[] = [
    { 
      key: 'dashboard_lesson', 
      text: t('header.dashboardLesson'), 
      action: () => handlePageChange('dashboard_lesson'),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
    },
    { 
      key: 'waste_site_analysis', 
      text: t('header.wasteSiteAnalysis'), 
      action: () => handlePageChange('waste_site_analysis'),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
    },
    { 
      key: 'recycling_calculator', 
      text: t('header.recyclingCalculator'), 
      action: () => handlePageChange('recycling_calculator'),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
    },
  ];

  const researchTools: NavLink[] = [
    { 
      key: 'grant_finder', 
      text: t('header.grantFinder'), 
      action: () => handlePageChange('grant_finder'),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    },
    { 
      key: 'supplier_finder', 
      text: t('header.supplierFinder'), 
      action: () => handlePageChange('supplier_finder'),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
    },
    { 
      key: 'ai_researcher', 
      text: t('header.aiResearcher'), 
      action: () => handlePageChange('ai_researcher'),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    },
    { 
      key: 'waste_news', 
      text: t('header.wasteNews'), 
      action: () => handlePageChange('waste_news'),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" /></svg>
    },
  ];

  const aiTools: NavLink[] = [
    { 
      key: 'ai_assistant', 
      text: t('header.aiAssistant'), 
      action: () => handlePageChange('ai_assistant'),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
    },
    { 
      key: 'zero_waste', 
      text: t('header.zeroWaste'), 
      action: () => handlePageChange('zero_waste'),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
    },
    { 
      key: 'impact_reporter', 
      text: t('header.impactReporter'), 
      action: () => handlePageChange('impact_reporter'),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    },
    { 
      key: 'blockchain', 
      text: t('header.blockchain'), 
      action: () => handlePageChange('blockchain'),
      icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
    },
  ];

  const allMobileLinks: MobileLink[] = [
    ...mainNavLinks, 
    { key: 'analytics_header', text: language === 'fa' ? 'ابزارهای تحلیلی' : 'Analytics', isHeader: true },
    ...analyticsTools,
    { key: 'research_header', text: language === 'fa' ? 'تحقیق و توسعه' : 'Research', isHeader: true },
    ...researchTools,
    { key: 'ai_header', text: language === 'fa' ? 'هوش مصنوعی' : 'AI Tools', isHeader: true },
    ...aiTools,
    { key: 'dashboard_header', text: t('header.smartDashboard'), isHeader: true },
    { key: 'smart_dashboard', text: t('header.smartDashboard'), action: () => handlePageChange('smart_dashboard') }
  ];


  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => setPage('home')} className="flex-shrink-0 flex items-center gap-2 group">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="font-bold text-xl text-gray-900 tracking-tight">EcoRide</span>
            </button>
            <nav className="hidden lg:flex lg:ml-10 lg:space-x-1 rtl:lg:space-x-reverse rtl:lg:mr-10 rtl:lg:ml-0">
              {mainNavLinks.map(link => (
                  <button 
                    key={link.key} 
                    onClick={link.action} 
                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${currentPage === link.key 
                        ? 'text-primary-600 bg-primary-50' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                  >
                    {link.text}
                    {currentPage === link.key && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-500 rounded-full"></span>
                    )}
                  </button>
              ))}
              
              <div className="relative" ref={suiteMenuRef}>
                 <button 
                   onClick={() => setIsSuiteMenuOpen(prev => !prev)} 
                   className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                     ${isSuiteMenuOpen 
                       ? 'text-primary-600 bg-primary-50' 
                       : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}
                  >
                    {t('header.sustainabilitySuite')}
                    <svg className={`w-4 h-4 transition-transform duration-200 ${isSuiteMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                 </button>
                 
                 {isSuiteMenuOpen && (
                    <div className={`absolute mt-2 w-[540px] bg-white border border-gray-100 rounded-2xl shadow-2xl z-20 overflow-hidden ${language === 'fa' ? 'right-0' : 'left-0'}`}>
                      <div className="p-4 bg-gradient-to-r from-primary-50 to-white border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-900">{t('header.sustainabilitySuite')}</h3>
                        <p className="text-xs text-gray-500 mt-0.5">{language === 'fa' ? 'ابزارهای پیشرفته مدیریت پسماند' : 'Advanced waste management tools'}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-px bg-gray-100">
                        <div className="bg-white p-3">
                          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">{language === 'fa' ? 'تحلیل و آمار' : 'Analytics'}</h4>
                          {analyticsTools.map(link => (
                            <button 
                              key={link.key} 
                              onClick={link.action} 
                              className="flex items-center gap-3 w-full px-2 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors group"
                            >
                              <span className="flex-shrink-0 w-9 h-9 bg-gray-100 group-hover:bg-primary-100 rounded-lg flex items-center justify-center text-gray-500 group-hover:text-primary-600 transition-colors">
                                {link.icon}
                              </span>
                              <span className="font-medium">{link.text}</span>
                            </button>
                          ))}
                        </div>
                        <div className="bg-white p-3">
                          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">{language === 'fa' ? 'تحقیق و توسعه' : 'Research'}</h4>
                          {researchTools.map(link => (
                            <button 
                              key={link.key} 
                              onClick={link.action} 
                              className="flex items-center gap-3 w-full px-2 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors group"
                            >
                              <span className="flex-shrink-0 w-9 h-9 bg-gray-100 group-hover:bg-primary-100 rounded-lg flex items-center justify-center text-gray-500 group-hover:text-primary-600 transition-colors">
                                {link.icon}
                              </span>
                              <span className="font-medium">{link.text}</span>
                            </button>
                          ))}
                        </div>
                        <div className="bg-white p-3 col-span-2 border-t border-gray-100">
                          <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 px-2">{language === 'fa' ? 'ابزارهای هوش مصنوعی' : 'AI Tools'}</h4>
                          <div className="grid grid-cols-2 gap-1">
                            {aiTools.map(link => (
                              <button 
                                key={link.key} 
                                onClick={link.action} 
                                className="flex items-center gap-3 w-full px-2 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-700 transition-colors group"
                              >
                                <span className="flex-shrink-0 w-9 h-9 bg-gray-100 group-hover:bg-primary-100 rounded-lg flex items-center justify-center text-gray-500 group-hover:text-primary-600 transition-colors">
                                  {link.icon}
                                </span>
                                <span className="font-medium">{link.text}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                 )}
              </div>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block" ref={langMenuRef}>
                <button 
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} 
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                    <span className="font-medium text-sm">{language === 'fa' ? 'FA' : 'EN'}</span>
                    <svg className={`w-3 h-3 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isLangMenuOpen && (
                    <div className={`absolute mt-2 w-36 bg-white border border-gray-100 rounded-xl shadow-xl z-20 overflow-hidden ${language === 'fa' ? 'left-0' : 'right-0'}`}>
                        <div className="py-1">
                            <button 
                              onClick={() => { setLanguage('fa'); setIsLangMenuOpen(false); }} 
                              className={`flex items-center justify-between w-full px-4 py-2.5 text-sm transition-colors ${language === 'fa' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                              <span>فارسی</span>
                              {language === 'fa' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                            </button>
                            <button 
                              onClick={() => { setLanguage('en'); setIsLangMenuOpen(false); }} 
                              className={`flex items-center justify-between w-full px-4 py-2.5 text-sm font-inter transition-colors ${language === 'en' ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'}`}
                            >
                              <span>English</span>
                              {language === 'en' && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="hidden lg:block">
              <button 
                onClick={() => handlePageChange('smart_dashboard')} 
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 text-sm shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                {t('header.smartDashboard')}
              </button>
            </div>

            <button 
              onClick={() => setIsMobileMenuOpen(prev => !prev)} 
              type="button" 
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white" id="mobile-menu">
          <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            {allMobileLinks.map(link => (
              link.isHeader ? 
              <div key={link.key} className="pt-4 pb-2 first:pt-0">
                <h3 className="px-3 text-xs font-bold uppercase tracking-wider text-gray-400">{link.text}</h3>
              </div> :
              <button 
                key={link.key} 
                onClick={link.action} 
                className={`flex items-center w-full px-3 py-2.5 rounded-lg text-base font-medium transition-colors
                  ${currentPage === link.key 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-50'}`}
              >
                {link.text}
              </button>
            ))}
            
            <div className="pt-4 border-t border-gray-100 mt-4">
              <div className="flex gap-2">
                <button 
                  onClick={() => { setLanguage('fa'); setIsMobileMenuOpen(false); }} 
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors ${language === 'fa' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'}`}
                >
                  فارسی
                </button>
                <button 
                  onClick={() => { setLanguage('en'); setIsMobileMenuOpen(false); }} 
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium font-inter transition-colors ${language === 'en' ? 'bg-primary-100 text-primary-700' : 'bg-gray-100 text-gray-600'}`}
                >
                  English
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
