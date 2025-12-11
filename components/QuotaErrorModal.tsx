
import React, { useState } from 'react';
import { useLanguage } from '../types';

interface QuotaErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToOpenRouter: (apiKey: string) => void;
}

const QuotaErrorModal: React.FC<QuotaErrorModalProps> = ({ isOpen, onClose, onSwitchToOpenRouter }) => {
  const { t } = useLanguage();
  const [apiKey, setApiKey] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in" aria-modal="true" role="dialog">
      <div className="bg-dark rounded-lg shadow-xl p-6 w-full max-w-md mx-4 border border-red-500/50">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-900/50">
            <svg className="h-6 w-6 text-red-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="mt-5 text-lg font-semibold leading-6 text-light">{t('quotaErrorModal.title')}</h3>
          <div className="mt-2">
            <p className="text-sm text-gray-300">
              {t('quotaErrorModal.body')}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Alternatively, you can use OpenRouter as a fallback.
            </p>
          </div>
        </div>

        <div className="mt-4">
            <label className="block text-xs font-medium text-gray-400 mb-1">OpenRouter API Key</label>
            <input 
                type="password" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-or-..."
                className="w-full bg-secondary/20 border border-secondary/40 rounded px-3 py-2 text-light text-sm focus:outline-none focus:border-primary"
            />
        </div>

        <div className="mt-5 sm:mt-6 grid grid-cols-1 gap-3">
          <button
            onClick={() => onSwitchToOpenRouter(apiKey)}
            disabled={!apiKey.trim()}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary-700 focus:outline-none disabled:bg-gray-600 disabled:cursor-not-allowed sm:text-sm"
          >
            Use OpenRouter
          </button>
          
          <div className="grid grid-cols-2 gap-3">
              <a
                href="https://aistudio.google.com/billing"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-transparent text-base font-medium text-gray-300 hover:bg-white/5 focus:outline-none sm:text-sm text-center"
              >
                {t('quotaErrorModal.cta')}
              </a>
              <button
                type="button"
                onClick={onClose}
                className="w-full inline-flex justify-center rounded-md border border-secondary/40 shadow-sm px-4 py-2 bg-secondary/30 text-base font-medium text-light hover:bg-secondary/50 focus:outline-none sm:text-sm"
              >
                {t('quotaErrorModal.close')}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuotaErrorModal;
