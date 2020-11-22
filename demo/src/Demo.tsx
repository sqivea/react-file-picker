import React from 'react';
import FilePicker, { InputErrorCode } from '../../lib';

const Demo: React.FC = () => (
  <FilePicker
    maxSize={1}
    sizeUnit='MB'
    extensions={['.jpg', '.png']}
    onFilePicked={(file) => { console.log(`File name: ${file.name}`); }}
    onSuccess={() => { console.log('Success'); }}
    onError={(code) => { printAllErrors(code); }}
  />
);

const printAllErrors = (errorCode: number) => {
  if (InputErrorCode.containsExtensionError(errorCode)) {
    console.log('File has inappropriate extension');
  }
  if (InputErrorCode.containsMaxSizeError(errorCode)) {
    console.log('File size exceeded max size specified');
  }
};

export default Demo;
