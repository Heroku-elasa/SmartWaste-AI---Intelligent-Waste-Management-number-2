
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, Page } from '../types';

interface SiteHeaderProps {
    currentPage: Page;
    setPage: (page: Page) => void;
}

// FIX: Define discriminated union types for mobile navigation links to resolve type errors.
interface ActionLink {
    key: string;
    text: any;
    action: () => void;
    isHeader?: undefined;
}
  
interface HeaderLink {
    key: string;
    text: any;
    isHeader: true;
    action?: undefined;
}
  
type MobileLink = ActionLink | HeaderLink;

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
  
  const mainNavLinks = [
    { key: 'home', text: t('header.home'), action: () => handlePageChange('home') },
    { key: 'waste_collection', text: t('header.requestWastePickup'), action: () => handlePageChange('waste_collection') },
    { key: 'real_time_dashboard', text: t('header.realTimeDashboard'), action: () => handlePageChange('real_time_dashboard') },
    { key: 'wordpress_dashboard', text: t('header.wpDashboard'), action: () => handlePageChange('wordpress_dashboard') },
  ];

  const suiteNavLinks = [
    { key: 'dashboard_lesson', text: t('header.dashboardLesson'), action: () => handlePageChange('dashboard_lesson') },
    { key: 'waste_site_analysis', text: t('header.wasteSiteAnalysis'), action: () => handlePageChange('waste_site_analysis') },
    { key: 'recycling_calculator', text: t('header.recyclingCalculator'), action: () => handlePageChange('recycling_calculator') },
    { key: 'grant_finder', text: t('header.grantFinder'), action: () => handlePageChange('grant_finder') },
    { key: 'supplier_finder', text: t('header.supplierFinder'), action: () => handlePageChange('supplier_finder') },
    { key: 'impact_reporter', text: t('header.impactReporter'), action: () => handlePageChange('impact_reporter') },
    { key: 'waste_news', text: t('header.wasteNews'), action: () => handlePageChange('waste_news') },
    { key: 'ai_researcher', text: t('header.aiResearcher'), action: () => handlePageChange('ai_researcher') },
    { key: 'zero_waste', text: t('header.zeroWaste'), action: () => handlePageChange('zero_waste') },
    { key: 'blockchain', text: t('header.blockchain'), action: () => handlePageChange('blockchain') },
    { key: 'ai_assistant', text: t('header.aiAssistant'), action: () => handlePageChange('ai_assistant') },
  ];

  const allMobileLinks: MobileLink[] = [...mainNavLinks, 
    { key: 'suite_header', text: t('header.sustainabilitySuite'), isHeader: true },
    ...suiteNavLinks,
    { key: 'dashboard_header', text: t('header.smartDashboard'), isHeader: true },
    { key: 'smart_dashboard', text: t('header.smartDashboard'), action: () => handlePageChange('smart_dashboard') }
  ];


  return (
    <header className="bg-light/80 backdrop-blur-sm sticky top-0 z-50 border-b border-primary-200/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button onClick={() => setPage('home')} className="flex-shrink-0 flex items-center space-x-2 rtl:space-x-reverse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="font-bold text-xl text-dark">EcoRide</span>
            </button>
            <nav className="hidden md:flex md:ml-10 md:space-x-1 lg:space-x-2">
              {mainNavLinks.map(link => (
                  <button key={link.key} onClick={link.action} className={`text-gray-600 hover:text-dark px-3 py-2 rounded-md text-sm font-medium transition-colors ${currentPage === link.key ? 'text-primary-600 font-semibold' : ''}`}>
                    {link.text}
                  </button>
              ))}
              {/* Suite Dropdown */}
              <div className="relative" ref={suiteMenuRef}>
                 <button onClick={() => setIsSuiteMenuOpen(prev => !prev)} className="text-gray-600 hover:text-dark px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center">
                    {t('header.sustainabilitySuite')}
                    <svg className={`w-4 h-4 ml-1 transition-transform ${isSuiteMenuOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                 </button>
                 {isSuiteMenuOpen && (
                    <div className={`absolute mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-20 ${language === 'fa' ? 'right-0' : 'left-0'}`}>
                        <ul className="py-1 max-h-[80vh] overflow-y-auto">
                            {suiteNavLinks.map(link => (
                                <li key={link.key}>
                                    <button onClick={() => handlePageChange(link.key as Page)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-primary-50">
                                        {link.text}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                 )}
              </div>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative hidden sm:block" ref={langMenuRef}>
                <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center text-gray-500 hover:text-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m4 13l4-4M19 9l-4 4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span className="font-semibold text-xs mx-1">{language === 'fa' ? 'FA' : 'EN'}</span>
                </button>
                {isLangMenuOpen && (
                    <div className={`absolute mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-xl z-20 ${language === 'fa' ? 'left-0' : 'right-0'}`}>
                        <ul className="py-1">
                            <li><button onClick={() => { setLanguage('fa'); setIsLangMenuOpen(false); }} className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">فارسی</button></li>
                            <li><button onClick={() => { setLanguage('en'); setIsLangMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-inter">English</button></li>
                        </ul>
                    </div>
                )}
            </div>

            <div className="hidden md:block">
              <button onClick={() => handlePageChange('smart_dashboard')} className="px-4 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-600 transition-colors text-sm shadow-sm">
                {t('header.smartDashboard')}
              </button>
            </div>

             <div className="-mr-2 flex md:hidden">
              <button onClick={() => setIsMobileMenuOpen(prev => !prev)} type="button" className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-dark hover:bg-gray-100 focus:outline-none" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen}>
                <span className="sr-only">Open main menu</span>
                {isMobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden animate-fade-in" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {allMobileLinks.map(link => (
              link.isHeader ? 
              <h3 key={link.key} className="px-3 pt-4 pb-1 text-xs font-bold uppercase text-gray-500">{link.text}</h3> :
              <button key={link.key} onClick={link.action} className="text-gray-600 hover:bg-gray-100 hover:text-dark block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors">
                {link.text}
              </button>
            ))}
             <div className="p-3">
                <button onClick={() => { setIsLangMenuOpen(prev => !prev) }} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-dark">
                  Language: {language === 'fa' ? 'فارسی' : 'English'}
                </button>
                {isLangMenuOpen && (
                  <div className="pl-6 pt-2">
                    <button onClick={() => { setLanguage('fa'); setIsLangMenuOpen(false); setIsMobileMenuOpen(false); }} className="block w-full text-right px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">فارسی</button>
                    <button onClick={() => { setLanguage('en'); setIsLangMenuOpen(false); setIsMobileMenuOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-inter">English</button>
                  </div>
                )}
              </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default SiteHeader;
