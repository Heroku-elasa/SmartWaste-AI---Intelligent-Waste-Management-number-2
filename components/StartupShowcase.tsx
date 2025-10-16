
import React from 'react';
import { useLanguage, Project, Page } from '../types';

interface ProjectsPageProps {
  setPage: (page: Page) => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ setPage }) => {
  const { t } = useLanguage();
  const projects: Project[] = t('projectsPage.projects');

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-light tracking-tight">
          {t('projectsPage.title')}
        </h1>
        <p className="mt-4 text-lg text-gray-300">{t('projectsPage.subtitle')}</p>
      </div>

      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <button 
            key={project.name} 
            onClick={() => project.link && setPage(project.link)}
            className="bg-secondary-900 border border-secondary-800 rounded-lg shadow-lg overflow-hidden group text-left transition-transform hover:-translate-y-1"
          >
            <div className="relative h-64">
                <img src={project.image} alt={project.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                 <h3 className="absolute bottom-4 left-4 right-4 text-xl font-bold text-white">{project.name}</h3>
            </div>
            <div className="p-6">
              <p className="mt-2 text-sm text-gray-400">{project.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;