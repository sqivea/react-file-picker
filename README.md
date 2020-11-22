# React file picker
## Installation
Using npm:
```shell
$ npm i @mavedev/react-file-picker
```
Or using yarn:
```shell
$ yarn add @mavedev/react-file-picker
```
## Usage
```tsx
import React from 'react';
import FilePicker, { InputErrorCode } from '@mavedev/react-file-picker';

const Demo: React.FC = () => (
  <FilePicker
    maxSize={1}
    sizeUnit='MB'
    extensions={['.jpg', '.png']}
    onFilePicked={(file) => { console.log(`File name: ${file.name}`); }}
    onSuccess={() => { console.log('Success'); }}
    onError={(code) => { printAllErrors(code); }}
  >
    <button type='button'>Upload file</button>
  </FilePicker>
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
```
## Demo
To run demo using npm:
```shell
$ npm run demo
```
To run demo using yarn:
```shell
$ yarn run demo
```
