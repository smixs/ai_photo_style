
export interface Style {
  id: string;
  name: string;
  emoji: string;
  prompt: string;
}

export enum AppState {
  INITIAL = 'INITIAL',
  IMAGE_UPLOADED = 'IMAGE_UPLOADED',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
}
