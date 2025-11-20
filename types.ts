export type Language = 'en' | 'zh';

export interface Song {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  style: string;
  duration: string;
  plays: number;
  lyrics?: string;
  isGenerated?: boolean;
}

export interface GenerationState {
  isGenerating: boolean;
  prompt: string;
  result: Song | null;
  error: string | null;
}