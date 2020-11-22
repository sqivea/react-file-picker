import React from 'react';
import FilePikcer, { InputErrorCode } from '../../lib';

const Demo: React.FC = () => (
  <FilePikcer
    maxSize={1}
    sizeUnit='MB'
    accept={['.jpg', '.png']}
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
