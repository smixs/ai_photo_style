import React, { useState, useCallback } from 'react';
import { DropZone } from './components/DropZone';
import { ImageViewer } from './components/ImageViewer';
import { StyleGrid } from './components/StyleGrid';
import { stylizeImage } from './services/geminiService';
import { AppState, Style } from './types';
import { STYLES } from './constants';
import { DownloadIcon, NewPhotoIcon } from './components/icons';
import { RetroGrid } from './components/ui/RetroGrid';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [stylizedImageUrl, setStylizedImageUrl] = useState<string | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.INITIAL);
  const [error, setError] = useState<string | null>(null);
  const [selectedStyleId, setSelectedStyleId] = useState<string | null>(null);

  const handleImageUpload = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImageUrl(reader.result as string);
      setOriginalImage(file);
      setAppState(AppState.IMAGE_UPLOADED);
      setStylizedImageUrl(null);
      setError(null);
      setSelectedStyleId(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleStyleSelect = async (style: Style) => {
    if (!originalImageUrl) return;

    setAppState(AppState.PROCESSING);
    setError(null);
    setSelectedStyleId(style.id);

    try {
      const base64Data = originalImageUrl.split(',')[1];
      const mimeType = originalImage?.type || 'image/jpeg';
      const newImageBase64 = await stylizeImage(base64Data, mimeType, style.prompt);
      
      setStylizedImageUrl(`data:image/png;base64,${newImageBase64}`);
      setAppState(AppState.COMPLETED);
    } catch (err) {
      console.error(err);
      setError('Не удалось применить стиль. Пожалуйста, попробуйте еще раз.');
      setAppState(AppState.IMAGE_UPLOADED);
    } finally {
        setSelectedStyleId(null);
    }
  };

  const handleReset = () => {
    setOriginalImage(null);
    setOriginalImageUrl(null);
    setStylizedImageUrl(null);
    setAppState(AppState.INITIAL);
    setError(null);
    setSelectedStyleId(null);
  };
  
  const handleDownload = () => {
    if (!stylizedImageUrl) return;
    const link = document.createElement('a');
    link.href = stylizedImageUrl;
    link.download = `stylized-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const isProcessing = appState === AppState.PROCESSING;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
      <RetroGrid />
      <main className="w-full max-w-4xl mx-auto flex flex-col items-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-6 text-center tracking-wide">
          AI <span className="text-violet-500">Редактор</span>
        </h1>

        <div className="w-full max-w-lg aspect-square rounded-2xl shadow-2xl flex items-center justify-center mb-6 relative overflow-hidden">
          {appState === AppState.INITIAL && <DropZone onImageUpload={handleImageUpload} setError={setError} />}
          {(appState === AppState.IMAGE_UPLOADED || appState === AppState.PROCESSING || appState === AppState.COMPLETED) && originalImageUrl && (
            <ImageViewer 
              original={originalImageUrl} 
              stylized={stylizedImageUrl} 
              isLoading={isProcessing} 
            />
          )}
        </div>
        
        {error && <p className="text-red-400 mb-4">{error}</p>}
        
        {appState !== AppState.INITIAL && (
            <div className="flex space-x-4 mb-6">
                <button
                    onClick={handleReset}
                    className="flex items-center justify-center gap-2 px-6 py-2 bg-slate-700 text-slate-100 rounded-lg hover:bg-slate-600 transition-colors duration-200"
                >
                    <NewPhotoIcon />
                    Новое фото
                </button>
                {appState === AppState.COMPLETED && stylizedImageUrl && (
                    <button
                        onClick={handleDownload}
                        className="flex items-center justify-center gap-2 px-6 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors duration-200"
                    >
                        <DownloadIcon />
                        Скачать
                    </button>
                )}
            </div>
        )}

        {appState === AppState.IMAGE_UPLOADED || appState === AppState.PROCESSING || appState === AppState.COMPLETED ? (
          <StyleGrid 
            styles={STYLES} 
            onStyleSelect={handleStyleSelect}
            disabled={isProcessing}
            processingStyleId={isProcessing ? selectedStyleId : null}
          />
        ) : null}
      </main>
    </div>
  );
};

export default App;