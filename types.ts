import React from 'react';

export interface Style {
  id: string;
  name: string;
  icon: React.FC<{ className?: string }>;
  prompt: string;
}

export enum AppState {
  INITIAL = 'INITIAL',
  IMAGE_UPLOADED = 'IMAGE_UPLOADED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
}