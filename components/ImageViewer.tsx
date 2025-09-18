import React, { useState, useRef, useCallback, useEffect } from 'react';
import LiquidLoading from './ui/LiquidLoader';

interface ImageViewerProps {
  original: string;
  stylized: string | null;
  isLoading: boolean;
}

export const ImageViewer: React.FC<ImageViewerProps> = ({ original, stylized, isLoading }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!isDragging || !imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  }, [isDragging]);

  const handleMouseMove = useCallback((e: MouseEvent) => handleMove(e.clientX), [handleMove]);
  const handleTouchMove = useCallback((e: TouchEvent) => handleMove(e.touches[0].clientX), [handleMove]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
  }, []);

  const handleUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handleUp);
      window.addEventListener('touchend', handleUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleUp);
      window.removeEventListener('touchend', handleUp);
    };
  }, [isDragging, handleMouseMove, handleTouchMove, handleUp]);
  
  return (
    <div ref={imageContainerRef} className="w-full h-full relative select-none overflow-hidden rounded-2xl bg-slate-800">
      <img src={original} alt="Original" className="block w-full h-full object-contain" draggable="false" />

      {stylized && (
        <div 
          className="absolute top-0 left-0 w-full h-full overflow-hidden" 
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img src={stylized} alt="Stylized" className="block w-full h-full object-contain" draggable="false" />
        </div>
      )}

      {stylized && !isLoading && (
        <div 
          className="absolute top-0 h-full w-1 bg-slate-100/50 cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-slate-100/80 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm">
            <svg className="w-6 h-6 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center backdrop-blur-sm z-20">
            <LiquidLoading />
            <p className="mt-4 text-lg font-semibold animate-pulse">Применяем магию...</p>
        </div>
      )}
    </div>
  );
};
