import React from 'react';

import { FilePickerProps } from './types';
import { InputErrorCode } from './InputError';
import { checkExtension, checkMaxSize, usePrevious } from './utils';

/**
 * Main component.
 * @author Cirill Usachov
 * @param {FilePickerProps} props
 * @param {number | undefined} props.maxSize File max size
 * @param {'B' | 'KB' | 'MB' | 'GB' | undefined} props.sizeUnit Size unit
 * @param {string | string[]  | undefined} props.extensions What extension or extensions to accept
 * @param {(...args: any[]) => any | undefined} props.onSuccess Success callback
 * @param {(errorCode: InputErrorCode) => void | undefined} props.onError Error callback
 * @param {(file: File) => void | undefined} props.onFilePicked What to do on file picked
 * @returns {React.FC<FilePickerProps>} React component
 * @example
 * <FilePicker
 *   extensions={['.jpg', '.jpeg', '.png']}
 *   onFilePicked={(file) => { console.log(`file: ${file.name}`); }}
 *   onSuccess={() => { console.log('Success'); }}
 *   onError={(code) => { console.log(`Error ${code}`); }}
 * />
 */
const FilePicker: React.FC<FilePickerProps> = ({
  maxSize = 0, sizeUnit = 'B', extensions = [],
  onSuccess = () => {}, onError = () => {},
  onFilePicked, children
}) => {
  const parsedExt = extensions instanceof Array ? extensions.join() : extensions;
  const packedExt = extensions instanceof Array ? extensions : [extensions];

  const [file, setFile] = React.useState<File | null>(null);
  const prevoiusFile = usePrevious(file);

  React.useEffect(() => {
    if (file === undefined && prevoiusFile !== undefined) {
      setFile(null);
    } else if (file !== null) {
      let errorCode = InputErrorCode.NoErrors;
      if (packedExt.length && !checkExtension(file, packedExt)) {
        errorCode |= InputErrorCode.InappropriateExtension;
      }

      if (maxSize > 0 && !checkMaxSize(file, maxSize, sizeUnit)) {
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

  const fileInput = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <input
        style={{ display: 'none' }}
        ref={fileInput}
        type='file'
        accept={parsedExt}
        onChange={(event) => {
          if (event.target.files) {
            setFile(event.target.files[0]);
          }
        }}
      />
      {React.cloneElement(children as React.ReactElement<any>, {
        onClick: () => fileInput.current?.click()
      })}
    </>
  );
};

export default FilePicker;
