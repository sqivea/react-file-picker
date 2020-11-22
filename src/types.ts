/**
 * File picker props.
 */
export type FilePickerProps = {
  maxSize?: number;
  sizeUnit?: SizeUnit;
  extensions?: string | string[];
  onSuccess?: (...args: any[]) => any;
  onError?: (errorCode: number) => void;
  onFilePicked: (file: File) => void;
};

/**
 * Size unit value.
 */
export type SizeUnit = 'B' | 'KB' | 'MB' | 'GB';
