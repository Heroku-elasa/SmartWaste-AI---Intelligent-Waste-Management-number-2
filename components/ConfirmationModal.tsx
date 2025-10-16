

import React from 'react';
import { useLanguage, WasteAnalysisResult } from '../types';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  result: WasteAnalysisResult | null;
  isConfirmed: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, result, isConfirmed }) => {
  const { t, language } = useLanguage();

  if (!isOpen || !result) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fade-in" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 border border-gray-200">
        {!isConfirmed ? (
          <>
            <h3 className="text-xl font-semibold text-center text-dark">{t('confirmationModal.title')}</h3>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                <span className="text-gray-600 font-medium">{t('confirmationModal.estimatedWeight')}</span>
                <span className="font-bold text-dark">{result.estimatedWeightKg} kg</span>
              </div>
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                <span className="text-gray-600 font-medium">{t('confirmationModal.pickupQuote')}</span>
                <span className="font-bold text-primary text-lg">{language === 'fa' ? `${result.pickupQuote.toLocaleString()} تومان` : `$${result.pickupQuote.toFixed(2)}`}</span>
              </div>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 overflow-hidden">
                 <iframe
                    title="Pickup Location Map"
                    width="100%"
                    height="100%"
                    loading="lazy"
                    allowFullScreen
                    style={{ border: 0 }}
                    src="https://www.openstreetmap.org/export/embed.html?bbox=51.3347%2C35.7000%2C51.4647%2C35.7500&layer=mapnik">
                </iframe>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button onClick={onClose} className="w-full py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-md hover:bg-gray-300 transition-colors">{t('confirmationModal.cancel')}</button>
              <button onClick={onConfirm} className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-700 transition-colors">{t('confirmationModal.confirm')}</button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 border-2 border-green-200">
                <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-dark">{t('confirmationModal.successTitle')}</h3>
            <p className="mt-2 text-sm text-gray-600">{t('confirmationModal.successBody')}</p>
            <button onClick={onClose} className="mt-6 w-full py-2 px-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-700 transition-colors">{t('confirmationModal.done')}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationModal;