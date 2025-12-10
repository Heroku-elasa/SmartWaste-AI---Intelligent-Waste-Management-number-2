
import React from 'react';
import { useLanguage, Page } from '../types';

interface BlockchainPageProps {
  setPage: (page: Page) => void;
}

const BlockchainPage: React.FC<BlockchainPageProps> = ({ setPage }) => {
  const { t, language } = useLanguage();
  const content = t('blockchainPage');

  const RoadmapStep = ({ phase, title, desc, isLast }: any) => (
    <div className="relative flex items-start group">
        {!isLast && (
            <div className="absolute top-0 left-[19px] h-full w-0.5 bg-gray-200 group-hover:bg-primary-300 transition-colors"></div>
        )}
        <div className="relative z-10 w-10 h-10 flex items-center justify-center bg-white border-2 border-primary rounded-full shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
        </div>
        <div className="ml-6 pb-12">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-wide bg-primary-50 px-2 py-1 rounded">{phase}</span>
            <h4 className="text-lg font-bold text-gray-900 mt-2">{title}</h4>
            <p className="text-gray-600 mt-1 leading-relaxed">{desc}</p>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans animate-fade-in">
        {/* Hero Section */}
        <div className="relative bg-[#0f172a] text-white overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900/50 to-purple-900/50"></div>
            
            <div className="container mx-auto px-4 py-24 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-primary-500/20 border border-primary-400 text-primary-300 text-sm font-bold tracking-wider mb-6">
                        {content.heroBadge}
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        {content.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-10 max-w-2xl mx-auto">
                        {content.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button onClick={() => setPage('smart_dashboard')} className="px-8 py-3 bg-primary hover:bg-primary-600 text-white font-bold rounded-lg transition-colors shadow-lg shadow-primary/25">
                            {content.cta}
                        </button>
                        <button onClick={() => document.getElementById('architecture')?.scrollIntoView({behavior: 'smooth'})} className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-colors backdrop-blur-sm">
                            Learn Architecture
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="container mx-auto px-6 -mt-16 relative z-20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center">
                    <div className="text-4xl mb-2">👥</div>
                    <div className="text-3xl font-bold text-green-600">{content.stats?.users?.value}</div>
                    <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">{content.stats?.users?.label}</div>
                </div>
                <div className="bg-white backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center">
                    <div className="text-4xl mb-2">♻️</div>
                    <div className="text-3xl font-bold text-green-600">{content.stats?.waste?.value}</div>
                    <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">{content.stats?.waste?.label}</div>
                </div>
                <div className="bg-white backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center">
                    <div className="text-4xl mb-2">🪙</div>
                    <div className="text-3xl font-bold text-green-600">{content.stats?.tokens?.value}</div>
                    <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">{content.stats?.tokens?.label}</div>
                </div>
                <div className="bg-white backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center">
                    <div className="text-4xl mb-2">📊</div>
                    <div className="text-3xl font-bold text-green-600">{content.stats?.transactions?.value}</div>
                    <div className="text-gray-600 text-sm font-medium uppercase tracking-wide">{content.stats?.transactions?.label}</div>
                </div>
            </div>
        </div>

        {/* How It Works */}
        <section className="py-20 container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">{content.howItWorks?.title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {content.howItWorks?.steps?.map((step: any, i: number) => (
                    <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center border border-gray-100 hover:-translate-y-2 transition-transform duration-300">
                        <div className="text-6xl mb-6">{step.icon}</div>
                        <h4 className="text-xl font-bold mb-3 text-gray-800">{step.title}</h4>
                        <p className="text-gray-600">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* Paradigm Shift */}
        <section className="py-20 container mx-auto px-4 bg-gray-50 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-center mb-16">{content.paradigmTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {/* Old */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl font-black text-gray-300 pointer-events-none group-hover:scale-110 transition-transform">2015</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{content.oldParadigm.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{content.oldParadigm.desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-red-500 font-mono text-sm">
                        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> Centralized Failure Point
                    </div>
                </div>
                
                {/* New */}
                <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-xl border border-gray-800 relative overflow-hidden group transform md:-translate-y-4">
                    <div className="absolute top-0 right-0 p-4 opacity-20 text-6xl font-black text-primary-500 pointer-events-none group-hover:scale-110 transition-transform">2025</div>
                    <h3 className="text-xl font-bold text-white mb-2">{content.newParadigm.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{content.newParadigm.desc}</p>
                    <div className="mt-6 flex items-center gap-2 text-green-400 font-mono text-sm">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Unstoppable Code
                    </div>
                </div>
            </div>
        </section>

        {/* Bitcoin Inspiration */}
        <section className="py-20 container mx-auto px-6">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                <h3 className="text-3xl font-bold mb-4 relative z-10">{content.bitcoinInspiration?.title}</h3>
                <p className="text-xl mb-10 max-w-3xl mx-auto relative z-10 text-green-50">{content.bitcoinInspiration?.desc}</p>
                <div className="flex flex-wrap gap-6 justify-center text-sm relative z-10">
                    {content.bitcoinInspiration?.badges?.map((badge: any, i: number) => (
                        <div key={i} className="bg-white/20 backdrop-blur-md rounded-xl p-4 min-w-[120px] border border-white/10 hover:bg-white/30 transition-colors">
                            <div className="text-3xl mb-2">{badge.icon}</div>
                            <div className="font-semibold">{badge.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Architecture Visualization */}
        <section id="architecture" className="py-20 bg-white border-y border-gray-100">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900">{content.architecture.title}</h2>
                </div>
                
                <div className="max-w-4xl mx-auto">
                    {/* Visual Flow */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-0"></div>

                        {/* Node 1 */}
                        <div className="relative z-10 flex flex-col items-center text-center bg-white p-4">
                            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-blue-100 mb-4">👤</div>
                            <h4 className="font-bold text-gray-900">{content.architecture.collector}</h4>
                        </div>

                        {/* Arrow */}
                        <div className="text-gray-300 text-2xl rotate-90 md:rotate-0">➔</div>

                        {/* Node 2 (Contract) */}
                        <div className="relative z-10 flex flex-col items-center text-center bg-white p-4">
                            <div className="w-24 h-24 bg-gray-900 rounded-2xl flex items-center justify-center text-4xl shadow-xl mb-4 text-primary-400 border-2 border-primary-500">📜</div>
                            <h4 className="font-bold text-gray-900">{content.architecture.smartContract}</h4>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded mt-1">Code is Law</span>
                        </div>

                        {/* Arrow */}
                        <div className="text-gray-300 text-2xl rotate-90 md:rotate-0">➔</div>

                        {/* Node 3 (Token) */}
                        <div className="relative z-10 flex flex-col items-center text-center bg-white p-4">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-3xl shadow-sm border border-green-100 mb-4">🪙</div>
                            <h4 className="font-bold text-gray-900">{content.architecture.token}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Roadmap */}
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-3xl font-bold text-center mb-12">{content.roadmap.title}</h2>
                <div className="pl-4 border-l-2 border-gray-100 ml-4 md:ml-0 md:border-none md:pl-0">
                    {content.roadmap.steps.map((step: any, i: number) => (
                        <RoadmapStep 
                            key={i} 
                            phase={step.phase} 
                            title={step.title} 
                            desc={step.desc} 
                            isLast={i === content.roadmap.steps.length - 1} 
                        />
                    ))}
                </div>
            </div>
        </section>

        <footer className="bg-white border-t border-gray-200 py-12">
            <div className="container mx-auto px-6 text-center text-gray-600">
                <p className="font-medium text-lg">{content.footer?.line1}</p>
                <p className="text-sm mt-3 text-gray-500 font-mono bg-gray-50 inline-block px-4 py-2 rounded-lg border border-gray-100">
                    {content.footer?.line2}
                </p>
            </div>
        </footer>
    </div>
  );
};

export default BlockchainPage;
