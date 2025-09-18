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
    <div className="w-full max-w-3xl">
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {styles.map((style) => {
          const isProcessing = processingStyleId === style.id;
          const Icon = style.icon;
          return (
            <button
              key={style.id}
              onClick={() => onStyleSelect(style)}
              disabled={disabled}
              className={`aspect-square p-2 bg-slate-900/60 border border-slate-700/80 rounded-xl flex flex-col items-center justify-center text-center transition-all duration-200 ease-in-out transform focus:outline-none backdrop-blur-sm ${disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-slate-800/80 hover:border-violet-500 hover:-translate-y-1'} ${isProcessing ? 'ring-2 ring-violet-500 animate-pulse' : 'focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-violet-500'}`}
            >
              <Icon className="h-7 w-7 md:h-8 md:w-8 mb-2 text-slate-300" />
              <span className="text-xs font-medium text-slate-300">{style.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};