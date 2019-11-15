import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

declare global {
    interface Window {
        require: any;
    }
}


export interface IBucketObject {
    ETag: string,
    Key: string,
    LastModified: string,
    Owner: any,
    DisplayName: string,

    Size: number,
    StorageClass: string
    ID: string,
}

export interface IConfig {
    userName: string;
    secretAccessKey: string;
    accessKeyId: string;
    s3BucketName: string;
    saveDirectoryPath: string;
}
ReactDOM.render(<App />, document.getElementById('root'));
