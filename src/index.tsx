import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

declare global {
    interface Window {
        require: any;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
