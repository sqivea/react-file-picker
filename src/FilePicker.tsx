import React from 'react';

import { FilePickerProps } from './types';
import { InputErrorCode } from './InputError';
import { checkExtension, checkMaxSize } from './utils';

/**
 * Main component.
 *
 * @param {number | undefined} maxSize File max size
 * @param {'B' | 'KB' | 'MB' | 'GB' | undefined} sizeUnit Size unit
 * @param {string | string[]  | undefined} accept What extension or extensions to accept
 * @param {(...args: any[]) => any | undefined} onSuccess Success callback
 * @param {(errorCode: InputErrorCode, ...args: any[]) => void | undefined} onError Error callback
 * @param {(file: File) => void | undefined} onFilePicked What to do on file picked
 */
const FilePicker: React.FC<FilePickerProps> = ({
  maxSize = 0, sizeUnit = 'B', accept = [],
  onSuccess = () => {}, onError = () => {},
  onFilePicked
}) => {
  const parsedExt = accept instanceof Array ? accept.join() : accept;
  const packedExt = accept instanceof Array ? accept : [accept];

  const [file, setFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    if (file !== null) {
      let errorCode = InputErrorCode.NoErrors;
      if (packedExt.length && checkExtension(file, packedExt)) {
        errorCode |= InputErrorCode.InappropriateExtension;
      }

      if (maxSize > 0 && checkMaxSize(file, maxSize, sizeUnit)) {
        errorCode |= InputErrorCode.MaxSizeExceeded;
      }

      if (errorCode === InputErrorCode.NoErrors) {
        onSuccess();
        onFilePicked(file);
      } else {
        onError(errorCode);
      }
    }
  }, [file]);

  return (
    <input
      type='file'
      accept={parsedExt}
      onChange={(event) => {
        if (event.target.files) {
          setFile(event.target.files[0]);
        }
      }}
    />
  );
};

export default FilePicker;
