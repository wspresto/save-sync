import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

declare global {
    interface Window {
        require: any;
    }
}

export interface ISave {
    id?: number;
    title: string;
}

export interface IConfig {
    secret: string;
    access: string;
    token: string;
    url: string;
    saveDirectoryPath: string;
}
ReactDOM.render(<App />, document.getElementById('root'));
