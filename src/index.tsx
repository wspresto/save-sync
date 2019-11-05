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
    secret: string;
    access: string;
    token: string;
    url: string;
    saveDirectoryPath: string;
}
ReactDOM.render(<App />, document.getElementById('root'));
