import { InputErrorCode } from './InputError';

/**
 * File picker props.
 */
export type FilePickerProps = {
  maxSize?: number;
  sizeUnit?: SizeUnit;
  accept?: string | string[];
  onSuccess?: (...args: any[]) => any;
  onError?: (errorCode: InputErrorCode, ...args: any[]) => void;
};

/**
 * Size unit value.
 */
export type SizeUnit = 'B' | 'KB' | 'MB' | 'GB';
