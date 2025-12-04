

import React from 'react';
import { useLanguage, Page } from '../types';

interface SiteFooterProps {
    setPage: (page: Page) => void;
}

const SiteFooter: React.FC<SiteFooterProps> = ({ setPage }) => {
    const { t } = useLanguage();

    const links: { page: Page, text: string }[] = [
        { page: 'home', text: t('header.home') },
        { page: 'smart_dashboard', text: t('header.smartDashboard') },
        { page: 'dashboard_lesson', text: t('header.dashboardLesson') },
        { page: 'wordpress_dashboard', text: t('header.wpDashboard') },
        { page: 'waste_collection', text: t('header.requestWastePickup') },
        { page: 'recycling_calculator', text: t('header.recyclingCalculator') },
        { page: 'ai_assistant', text: t('header.aiAssistant') },
    ];

    return (
        <footer id="footer" className="bg-primary-900 text-primary-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-bold text-xl text-white">EcoRide</span>
                        </div>
                        <p className="text-sm leading-relaxed max-w-sm text-primary-200/80">{t('footer.description')}</p>
                    </div>
                    
                    <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm font-semibold text-primary-100 tracking-wider uppercase">{t('footer.quickLinks')}</h3>
                            <ul className="mt-4 space-y-2">
                                {links.map(link => (
                                    <li key={link.page}>
                                        <button onClick={() => setPage(link.page)} className="text-base text-primary-200 hover:text-white transition-colors">{link.text}</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-primary-100 tracking-wider uppercase">{t('footer.contact')}</h3>
                             <ul className="mt-4 space-y-2">
                                <li>
                                    <p className="text-base text-primary-200">📞 +98 21 1234 5678</p>
                                </li>
                                <li>
                                    <p className="text-base text-primary-200">📍 {t('footer.address')}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-primary-800 pt-8 text-center text-xs text-primary-400">
                    <p>{t('footer.copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default SiteFooter;