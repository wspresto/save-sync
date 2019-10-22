const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;
export class ElectronServices {
    getConfig() {
        let config = ipcRenderer.sendSync('config.get');
        console.log(config); // TESTING!!!
    };

    getFiles() {
        ipcRenderer.send('files.get');
    };
}