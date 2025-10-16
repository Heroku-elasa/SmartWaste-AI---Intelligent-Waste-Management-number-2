

import React from 'react';
import { useLanguage, Page, Project } from '../types';

interface HomePageProps {
    setPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  const { t } = useLanguage();
  const projects: Project[] = t('projectsPage.heroProjects') as Project[];

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
      
      {/* Features Section */}
      <section className="pb-16 -mt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(projects as Project[]).map((project, index) => (
                    <div key={index} className="bg-white border border-gray-200/80 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
                       <div className="relative">
                          <img src={project.image} alt={project.name} className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-300"/>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-0 p-6">
                            <h3 className="font-bold text-2xl text-white">{project.name}</h3>
                          </div>
                       </div>
                       <div className="p-6 bg-white">
                         <p className="text-sm text-gray-600">{project.description}</p>
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