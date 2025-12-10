

import React from 'react';
import { useLanguage, Page } from '../types';

interface DashboardLessonPageProps {
  setPage: (page: Page) => void;
}

const DashboardLessonPage: React.FC<DashboardLessonPageProps> = ({ setPage }) => {
  const { t } = useLanguage();
  const content = t('dashboardLesson');

  return (
    <div className="bg-white text-gray-800 min-h-screen font-sans animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-7xl">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          {content.breadcrumb}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-3">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{content.title}</h1>
            
            <p className="text-lg leading-relaxed mb-8">
              {content.intro}
            </p>

            {/* Objectives */}
            <div className="bg-gray-50 border-l-4 border-blue-500 p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">{content.objectivesTitle}</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {content.objectives?.map((obj: string, i: number) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>
            </div>

            {/* Prerequisite Skills */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{content.prerequisitesTitle}</h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {content.prerequisites?.map((req: string, i: number) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </div>

            <hr className="border-gray-200 my-10" />

            {/* Hands-on Walk-through */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.walkthroughTitle}</h2>

              {/* Step 1: Access */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">{content.accessSection?.title}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{content.accessSection?.content}</p>
                <div className="bg-gray-100 p-4 rounded-lg border border-gray-200 text-center">
                   <button 
                      onClick={() => setPage('smart_dashboard')} 
                      className="px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary-700 transition-colors shadow-sm"
                   >
                     Go to Dashboard
                   </button>
                   <p className="text-xs text-gray-500 mt-2">(Clicking this will take you to the live dashboard)</p>
                </div>
              </div>

              {/* Step 2: Components */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">{content.componentsSection?.title}</h3>
                <p className="text-gray-700 leading-relaxed mb-4">{content.componentsSection?.content}</p>
                <ul className="space-y-4">
                  {content.componentsSection?.items?.map((item: any, i: number) => (
                    <li key={i} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <strong className="block text-primary-700 text-lg mb-1">{item.title}</strong>
                      <span className="text-gray-600">{item.desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step 3: View Toggle */}
              <div className="mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">{content.viewSection?.title}</h3>
                <p className="text-gray-700 leading-relaxed">{content.viewSection?.content}</p>
              </div>

            </div>
            
            <hr className="border-gray-200 my-10" />

            {/* Exercises */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{content.exercisesTitle}</h2>
              <div className="space-y-4">
                  {content.exercises?.map((ex: any, i: number) => (
                    <div key={i} className="bg-yellow-50 border border-yellow-200 p-5 rounded-lg">
                        <h4 className="font-bold text-yellow-800 mb-2">{i + 1}. {ex.title}</h4>
                        <p className="text-yellow-700">{ex.desc}</p>
                    </div>
                  ))}
              </div>
            </div>
            
            {/* Quiz */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{content.quizTitle}</h2>
              <div className="space-y-6">
                  {content.quiz?.map((q: any, i: number) => (
                    <div key={i} className="bg-white border border-gray-200 p-5 rounded-lg shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3">{i + 1}. {q.question}</h4>
                        <div className="space-y-2">
                             {q.options?.map((opt: string, j: number) => (
                                 <label key={j} className="flex items-center gap-2 cursor-pointer">
                                     <input type="radio" name={`question-${i}`} className="text-primary focus:ring-primary" />
                                     <span className="text-gray-700">{opt}</span>
                                 </label>
                             ))}
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100">
                             <details className="text-sm text-gray-500 cursor-pointer">
                                 <summary className="hover:text-primary">Show Answer</summary>
                                 <p className="mt-2 font-medium text-green-600">{q.answer}</p>
                             </details>
                        </div>
                    </div>
                  ))}
              </div>
            </div>

          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-300 pb-2">
                {content.sidebarTitle}
              </h3>
              <ul className="space-y-3 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {content.sidebar?.duration}
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  {content.sidebar?.audience}
                </li>
                <li className="flex items-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  {content.sidebar?.level}
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  {content.sidebar?.type}
                </li>
                 <li className="pt-2 border-t border-gray-200 mt-2 text-xs text-gray-400">
                  {content.sidebar?.version}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLessonPage;
