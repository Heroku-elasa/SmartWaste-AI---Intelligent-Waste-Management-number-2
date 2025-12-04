import React from 'react';
import { useLanguage, Grant } from '../types';

interface GrantDetailPageProps {
    grant: Grant;
    onBack: () => void;
}

const DetailSection: React.FC<{ title: string; content: React.ReactNode }> = ({ title, content }) => {
    if (!content) return null;
    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-6 animate-fade-in">
            <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-100 pb-2 mb-4">{title}</h3>
            <div className="text-gray-600 leading-relaxed text-sm">
                {content}
            </div>
        </div>
    );
};

const GrantDetailPage: React.FC<GrantDetailPageProps> = ({ grant, onBack }) => {
    const { t } = useLanguage();

    return (
        <div className="bg-gray-50 min-h-screen py-12 animate-fade-in">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                <button 
                    onClick={onBack} 
                    className="mb-8 flex items-center gap-2 text-primary-600 hover:text-primary-800 font-medium transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    {t('grantDetailPage.back')}
                </button>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-8">
                    <div className="bg-primary-900 px-8 py-10 text-white">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <span className="inline-block bg-primary-700 text-primary-100 text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                                    {grant.grantNumber || 'Grant'}
                                </span>
                                <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">{grant.grantTitle}</h1>
                                {grant.issuingAgency && <p className="text-primary-200 mt-2 text-lg font-medium">{grant.issuingAgency}</p>}
                            </div>
                            {grant.status && (
                                <div className="bg-green-500/20 border border-green-400/30 text-green-100 px-4 py-2 rounded-lg backdrop-blur-sm">
                                    <span className="text-sm font-bold uppercase">{grant.status}</span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 bg-white">
                        <div className="p-6 text-center">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{t('grantDetailPage.funding')}</p>
                            <p className="text-2xl font-bold text-gray-900">{grant.fundingAvailable || grant.amount || 'N/A'}</p>
                        </div>
                        <div className="p-6 text-center">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{t('grantDetailPage.deadline')}</p>
                            <p className="text-2xl font-bold text-gray-900">{grant.deadline || 'N/A'}</p>
                        </div>
                        <div className="p-6 text-center">
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">{t('grantDetailPage.agency')}</p>
                            <p className="text-xl font-bold text-gray-900">{grant.issuingAgency || 'N/A'}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-2">
                        <DetailSection 
                            title={t('grantDetailPage.overview')} 
                            content={grant.programOverview || grant.description} 
                        />
                        
                        <DetailSection 
                            title={t('grantDetailPage.features')} 
                            content={
                                grant.keyFeatures && grant.keyFeatures.length > 0 ? (
                                    <ul className="list-disc list-inside space-y-2">
                                        {grant.keyFeatures.map((feature, idx) => (
                                            <li key={idx}>{feature}</li>
                                        ))}
                                    </ul>
                                ) : null
                            } 
                        />

                        <DetailSection 
                            title={t('grantDetailPage.eligibility')} 
                            content={grant.eligibility} 
                        />

                        <DetailSection 
                            title={t('grantDetailPage.whyThisFits')} 
                            content={grant.whyThisFits ? (
                                <div className="bg-blue-50 p-4 rounded-md border-l-4 border-blue-500 text-blue-800">
                                    {grant.whyThisFits}
                                </div>
                            ) : null} 
                        />
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        {grant.contactInformation && (
                            <div className="bg-gray-800 text-white rounded-lg p-6 shadow-md">
                                <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">{t('grantDetailPage.contact')}</h3>
                                <div className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">
                                    {grant.contactInformation}
                                </div>
                            </div>
                        )}

                        {grant.applicationMaterials && grant.applicationMaterials.length > 0 && (
                            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('grantDetailPage.materials')}</h3>
                                <ul className="space-y-3">
                                    {grant.applicationMaterials.map((material, idx) => (
                                        <li key={idx} className="flex items-center text-sm text-primary-600">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            {material}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {grant.link && (
                             <a 
                                href={grant.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="block w-full text-center py-3 bg-primary hover:bg-primary-700 text-white font-bold rounded-lg shadow-md transition-colors"
                            >
                                Apply / Official Page
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GrantDetailPage;