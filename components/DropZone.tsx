import React, { useCallback, useState } from 'react';
import { UploadIcon } from './icons';

interface DropZoneProps {
  onImageUpload: (file: File) => void;
  setError: (message: string | null) => void;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const DropZone: React.FC<DropZoneProps> = ({ onImageUpload, setError }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileValidation = useCallback((file: File) => {
    setError(null);
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      setError('Неверный тип файла. Пожалуйста, выберите jpg, png или webp.');
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError('Файл слишком большой. Максимальный размер 5MB.');
      return false;
    }
    return true;
  }, [setError]);

  const handleFileChange = useCallback((files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      if (handleFileValidation(file)) {
        onImageUpload(file);
      }
    }
  }, [handleFileValidation, onImageUpload]);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, [handleFileChange]);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e.target.files);
  };

  return (
    <div
      className={`w-full h-full p-8 flex flex-col items-center justify-center border-4 border-dashed rounded-2xl transition-colors duration-300 ${isDragging ? 'border-violet-500 bg-slate-800/50' : 'border-slate-600'}`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <input
        type="file"
        id="file-upload"
        className="hidden"
        accept={ACCEPTED_FILE_TYPES.join(',')}
        onChange={onInputChange}
      />
      <label htmlFor="file-upload" className="cursor-pointer text-center">
        <UploadIcon className="mx-auto mb-4 text-slate-500" />
        <p className="text-slate-400">Перетащите фото или <span className="text-violet-400 font-semibold">нажмите для выбора</span></p>
        <p className="text-xs text-slate-500 mt-2">JPG, PNG, WEBP, макс. 5MB</p>
      </label>
    </div>
  );
};