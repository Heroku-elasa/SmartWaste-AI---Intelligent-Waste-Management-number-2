

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useLanguage, WasteAnalysisResult, WasteItem } from '../types';

interface WasteCollectorPageProps {
  onAnalyze: (image: { base64: string; mimeType: string; }) => void;
  isLoading: boolean;
  error: string | null;
  result: WasteAnalysisResult | null;
  onRequestPickup: () => void;
}

const WasteCollectorPage: React.FC<WasteCollectorPageProps> = ({ onAnalyze, isLoading, error, result, onRequestPickup }) => {
  const { t, language } = useLanguage();
  const [image, setImage] = useState<{base64: string, mimeType: string, url: string} | null>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraOn(true);
      }
    } catch (err) {
      console.error("Camera error:", err);
      alert(t('wasteCollectorPage.cameraError'));
    }
  };
  
  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      const dataUrl = canvas.toDataURL('image/jpeg');
      const base64 = dataUrl.split(',')[1];
      setImage({ base64, mimeType: 'image/jpeg', url: dataUrl });
      stopCamera();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const base64 = dataUrl.split(',')[1];
        setImage({ base64, mimeType: file.type, url: dataUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyzeClick = () => {
    if (image) {
      onAnalyze({ base64: image.base64, mimeType: image.mimeType });
    }
  };

  useEffect(() => {
    // Cleanup camera on component unmount
    return () => stopCamera();
  }, [stopCamera]);

  const getCategoryColor = (category: WasteItem['category']) => {
    switch(category) {
        case 'Recycling': return 'border-blue-400';
        case 'Compost': return 'border-green-400';
        case 'Landfill': return 'border-gray-500';
        case 'Special': return 'border-yellow-400';
        default: return 'border-gray-500';
    }
  }

  return (
    <section id="waste-collector" className="py-16 sm:py-24 animate-fade-in">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-dark tracking-tight">{t('wasteCollectorPage.title')}</h1>
          <p className="mt-4 text-lg text-gray-700">{t('wasteCollectorPage.subtitle')}</p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: Camera/Upload */}
          <div className="space-y-4">
            <div className="aspect-video bg-gray-100 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center">
                {!isCameraOn && !image && (
                    <div className="text-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <p className="mt-2 text-sm">{t('wasteCollectorPage.instructions')}</p>
                    </div>
                )}
                {image && <img src={image.url} alt="Captured waste" className="w-full h-full object-contain" />}
                <video ref={videoRef} autoPlay playsInline className={`w-full h-full object-cover ${isCameraOn ? '' : 'hidden'}`}></video>
                <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {!isCameraOn ? (
                    <button onClick={startCamera} className="w-full py-3 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors">{t('wasteCollectorPage.startCamera')}</button>
                ) : (
                    <button onClick={stopCamera} className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors">{t('wasteCollectorPage.stopCamera')}</button>
                )}
                {isCameraOn ? (
                    <button onClick={handleCapture} className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-600 transition-colors">{t('wasteCollectorPage.capture')}</button>
                ) : (
                    <button onClick={() => fileInputRef.current?.click()} className="w-full py-3 px-4 bg-gray-600 text-white font-semibold rounded-md hover:bg-gray-700 transition-colors">{t('wasteCollectorPage.upload')}</button>
                )}
            </div>
             <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" className="hidden" />
          </div>

          {/* Right: Results */}
          <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-md min-h-[300px]">
            <h2 className="text-2xl font-bold mb-4 text-dark text-center">{t('wasteCollectorPage.analysisResults')}</h2>
            {isLoading && (
                 <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-primary"></div>
                    <p className="mt-4 text-gray-600">{t('wasteCollectorPage.analyzing')}</p>
                 </div>
            )}
            {error && <div className="text-red-700 p-4 bg-red-100 rounded-md">{error}</div>}
            
            {!isLoading && !result && (
                <div className="text-center py-10 text-gray-500">
                    <p>{!image ? t('wasteCollectorPage.instructions') : 'Image ready for analysis.'}</p>
                </div>
            )}

            {result && (
                <div className="space-y-6 animate-fade-in">
                    <div>
                        <h3 className="font-semibold text-primary mb-2">{t('wasteCollectorPage.identifiedItems')}</h3>
                        <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                           {result.identifiedItems?.map((item, i) => (
                               <div key={i} className={`p-3 bg-gray-50 border-l-4 rounded-r-lg text-sm ${getCategoryColor(item.category)}`}>
                                   <div className="flex justify-between items-center">
                                       <span className="font-bold text-dark">{item.item}</span>
                                       <span className="text-xs font-medium text-gray-600">{t(`wasteCollectorPage.${item.category.toLowerCase()}`)}</span>
                                   </div>
                                   <p className="text-xs text-gray-500 mt-1">{item.instructions}</p>
                               </div>
                           ))}
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-gray-100 rounded-lg">
                           <h4 className="text-xs font-semibold text-gray-500 uppercase">{t('wasteCollectorPage.estimatedWeight')}</h4>
                           <p className="text-lg font-bold text-dark">{result.estimatedWeightKg} kg</p>
                        </div>
                         <div className="p-3 bg-gray-100 rounded-lg">
                           <h4 className="text-xs font-semibold text-gray-500 uppercase">{t('wasteCollectorPage.recyclingPotential')}</h4>
                           <p className="text-lg font-bold text-dark">{result.recyclingPotential}</p>
                        </div>
                    </div>
                </div>
            )}

             <div className="mt-6 pt-6 border-t border-gray-200">
                {image && !result && (
                     <button onClick={handleAnalyzeClick} disabled={isLoading} className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-600 disabled:bg-gray-400 transition-colors">
                        {isLoading ? t('wasteCollectorPage.analyzing') : 'Analyze Waste'}
                    </button>
                )}
                {result && (
                    <div className="text-center">
                        <p className="text-sm text-gray-600">{t('wasteCollectorPage.pickupQuote')}</p>
                        <p className="text-4xl font-extrabold text-dark my-2">{language === 'fa' ? `${result.pickupQuote.toLocaleString()} تومان` : `$${result.pickupQuote.toFixed(2)}`}</p>
                        <button onClick={onRequestPickup} className="w-full py-3 px-4 bg-primary text-white font-semibold rounded-md hover:bg-primary-600 transition-colors">
                            {t('wasteCollectorPage.requestPickup', { price: language === 'fa' ? `${result.pickupQuote.toLocaleString()} تومان` : `$${result.pickupQuote.toFixed(2)}` })}
                        </button>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WasteCollectorPage;
