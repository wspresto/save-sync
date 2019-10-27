const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const fs = require('fs');
const archiver = require('archiver');
const S3 = require('aws-sdk/clients/s3');
const stream = require('stream');

let mainWindow = null;



/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', async () => {

    mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadURL(`file://${__dirname}/build/index.html`);

    // @TODO: Use 'ready-to-show' event
    //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
    mainWindow.webContents.on('did-finish-load', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        if (process.env.START_MINIMIZED) {
            mainWindow.minimize();
        } else {
            mainWindow.show();
            mainWindow.focus();
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

 
    // Endpoints
    ipcMain.on('config.get', (e, payload) => {
        //TODO: get config file AND follow response pattern
        e.returnValue = {
            response: {}
        };
    });

    ipcMain.on('config.set', (e, payload) => {
        //TODO: write config to file...AND follow response pattern
        e.returnValue = {
            response: {}
        };
    });

    ipcMain.on('directory.find', (e, arg) => {
        dialog.showOpenDialog({ properties: ['openFile', 'openDirectory'] }).then((dialogResponse) => {
            console.log(dialogResponse); // TESTING!!!
            e.reply('directory.find.response', dialogResponse);
        });

    });

    ipcMain.on('directory.upload', (e, payload) => {
        // uploadDirectory(payload.directoryPath); 
        //TODO:AND follow response pattern
    });

});

/**
 * returns write stream
 * @param {} directoryPath 
 */
function uploadDirectory(directoryPath) {
    console.log(directoryPath); // TESTING!!!

/*     
    const s3 = new S3();
    const pass = new stream.PassThrough();
    const params = {Bucket: BUCKET, Key: KEY, Body: pass}; //sets up passthrough stream

    var archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });

    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    output.on('end', function () {
        console.log('Data has been drained');
    });


    archive.on('warning', function (err) {
        if (err.code === 'ENOENT') {
            console.error(err);
        } else {
            throw err;
        }
    });

    archive.on('error', function (err) {
        throw err;
    });

    // pipe archive data to the file

    archive.pipe(s3.upload(params, function(err, data) {
        console.log(err, data);
    }));
    archive.directory(directoryPath, false);
    archive.finalize();
     */

}