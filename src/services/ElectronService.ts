import { IConfig } from '../index';

import { IpcRenderer } from 'electron';
export class ElectronService {
    constructor(){}

    get ipcRenderer(): IpcRenderer {
        const userAgent = navigator.userAgent.toLowerCase();
        if (userAgent.indexOf(' electron/') > -1) {
            return window.require('electron').ipcRenderer;
        } else {
            return null as any;
        }
    }

    get isNative(): boolean {
        return this.ipcRenderer !== null;
    }

    getResponseFromElectron(eventName: string, ...args: any []): Promise<any> {
        if (this.ipcRenderer) {
            this.ipcRenderer.send(eventName, ...args);
            return new Promise((resolve, reject) => {
                this.ipcRenderer.on(`${eventName}.response`, (e, response) => {
                    resolve(response);
                });
            })
        } else {
            return Promise.reject({});
        }   
    }

    getConfig(): Promise<IConfig> {
        return this.getResponseFromElectron('config.get');
    }
    
    setConfig(config: IConfig):  Promise<IConfig> {
        return this.getResponseFromElectron('config.set', config);     
    }

    getDirectory(): Promise<any> {
        return this.getResponseFromElectron('directory.find');
    }

    uploadDirectory(directoryPath: string): Promise<any> {
        return this.getResponseFromElectron('directory.upload');
    }

}