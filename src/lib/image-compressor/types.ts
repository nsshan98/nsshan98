export type OutputFormat =
  | "original"
  | "image/webp"
  | "image/jpeg"
  | "image/png"
  | "image/avif"
  | "image/bmp"
  | "image/x-icon";

export interface CompressionSettings {
  quality: number; // 1 to 100
  targetSizeKb: number | null; // e.g. 500 for 500KB or null
  maintainAspectRatio: boolean;
  width: number | null;
  height: number | null;
  preset: string; // 'original' | '4096' | '2048' | '1920' | '1280' | '1024' | '800' | 'custom'
  outputFormat: OutputFormat;
  removeMetadata: boolean; // default true
}

export type ProcessingStatus = "idle" | "processing" | "done" | "error";

export interface ImageItem {
  id: string;
  file: File;
  originalName: string;
  originalSize: number; // bytes
  originalType: string; // mime type
  originalWidth: number;
  originalHeight: number;
  originalUrl: string; // object URL for preview
  compressedUrl: string | null;
  compressedBlob: Blob | null;
  compressedSize: number | null; // bytes
  compressedWidth: number | null;
  compressedHeight: number | null;
  status: ProcessingStatus;
  error?: string;
  reductionPercent: number | null;
  savedBytes: number | null;
  estimatedSizeStr?: string;
}

export interface FormatOption {
  mime: OutputFormat;
  label: string;
  ext: string;
  description: string;
  isSupported: boolean;
}
