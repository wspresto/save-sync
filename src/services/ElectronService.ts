import { IConfig } from '../index';

const electron = window.require ? window.require('electron') : null;
export class ElectronService {
    constructor(){}
    get ipcRenderer() {
        if (electron) {
            return electron.ipcRenderer;
        } else {
            return null
        }
    }

    getConfig(): IConfig {
        if (this.ipcRenderer) {
            return this.ipcRenderer.sendSync('config.get');
        } else {
            return {} as any;
        }
    }
    
    setConfig(config: IConfig): IConfig {
        if (this.ipcRenderer) {
            return this.ipcRenderer.sendSync('config.set', config);
        } else {
            return {} as any;
        }              
    }

    getDirectory(): Promise<any> {
        if (this.ipcRenderer) {
            return this.ipcRenderer.sendSync('directory.find');
        } else {
            return Promise.resolve({});
        }        
    }

    uploadDirectory(directoryPath: string) {
        this.ipcRenderer.sendAsync('directory.upload', {
            directoryPath: directoryPath
        });
    }

}