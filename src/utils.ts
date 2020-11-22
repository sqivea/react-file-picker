import { SizeUnit } from './types';

/**
 * Check if allowed file extensions contains the one the given file got.
 *
 * @param {File} file File to be checked
 * @param {string[]} extensions Allowed extensions
 * @returns Ok or not
 */
export function checkExtension(file: File, extensions: string[]) {
  const extension = file.name.split('.').pop()?.toLowerCase();
  return typeof extension !== 'undefined' && extensions
    .map((ext) => ext.toLowerCase())
    .includes(extension);
}

/**
 * Check if given file does not exceed max allowed file size.
 *
 * @param {File} file File to be checked
 * @param {number} maxSize Max allowed size
 * @param {'B' | 'KB' | 'MB' | 'GB'} sizeUnit Size unit
 * @returns Ok or not
 */
export function checkMaxSize(file: File, maxSize: number, sizeUnit: SizeUnit) {
  return (
    sizeUnit === 'KB' ? file.size <= maxSize * 1024
      : sizeUnit === 'MB' ? file.size <= maxSize * 1048576
        : sizeUnit === 'GB' ? file.size <= maxSize * 1073741824
          : file.size <= maxSize);
}
