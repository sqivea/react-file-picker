import React from 'react';
import { SizeUnit } from './types';

/**
 * Check if allowed file extensions contains the one the given file got.
 * @author Cirill Usachov
 * @param {File} file File to be checked
 * @param {string[]} extensions Allowed extensions
 * @returns {boolean} Ok or not
 */
export function checkExtension(file: File, extensions: string[]) {
  const extension = file.name.split('.').pop()?.toLowerCase();
  return typeof extension !== 'undefined' && extensions
    .map((ext) => ext.toLowerCase().replace('.', ''))
    .includes(extension);
}

/**
 * Check if given file does not exceed max allowed file size.
 * @author Cirill Usachov
 * @param {File} file File to be checked
 * @param {number} maxSize Max allowed size
 * @param {'B'|'KB'|'MB'|'GB'} sizeUnit Size unit
 * @returns {boolean} Ok or not
 */
export function checkMaxSize(file: File, maxSize: number, sizeUnit: SizeUnit) {
  return (
    sizeUnit === 'KB' ? file.size <= maxSize * 1024
      : sizeUnit === 'MB' ? file.size <= maxSize * 1048576
        : sizeUnit === 'GB' ? file.size <= maxSize * 1073741824
          : file.size <= maxSize);
}

/**
 * Hook to retrieve previous value for state property.
 * @author Cirill Usachov
 * @param {T} value Tracked value
 * @returns {T|undefined} Previous value
 */
export function usePrevious<T>(value: T) {
  const ref = React.useRef<T>();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
