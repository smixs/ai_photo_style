
import React from 'react';
import { Style } from '../types';

interface StyleGridProps {
  styles: Style[];
  onStyleSelect: (style: Style) => void;
  disabled: boolean;
  processingStyleId: string | null;
}

export const StyleGrid: React.FC<StyleGridProps> = ({ styles, onStyleSelect, disabled, processingStyleId }) => {
  return (
    <div className="w-full max-w-2xl">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {styles.map((style) => {
          const isProcessing = processingStyleId === style.id;
          return (
            <button
              key={style.id}
              onClick={() => onStyleSelect(style)}
              disabled={disabled}
              className={`p-3 md:p-4 bg-slate-800 rounded-lg flex flex-col items-center justify-center text-center transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500 ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-slate-700'} ${isProcessing ? 'ring-2 ring-violet-500 animate-pulse' : ''}`}
            >
              <span className="text-2xl md:text-3xl mb-2">{style.emoji}</span>
              <span className="text-xs md:text-sm font-medium">{style.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
