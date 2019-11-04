const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const fs = require('fs');
const archiver = require('archiver');
const S3 = require('aws-sdk/clients/s3');
const stream = require('stream');

let mainWindow = null;

const CONFIG_DIR = './.sync';
const CONFIG_FILE = 'config.json'

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

    // Make directory for config file if not already present
    if (!fs.existsSync(CONFIG_DIR)) {
        fs.mkdirSync(CONFIG_DIR);
    }

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

        if (!fs.existsSync(CONFIG_DIR + '/' + CONFIG_FILE)) {
            console.log(e); // TESTING!!!
            e.reply('config.set.response', null);
        } else {

            fs.readFile(CONFIG_DIR + '/' + CONFIG_FILE, { "encoding": "utf8" }, (err, data) => {

                if (!err) {
                    let obj = {};
                    try {
                        obj = JSON.parse(data);
                        console.log('Replying...'); // TESTING!!!
                        //                        e.reply(, obj);    
                        mainWindow.webContents.send('config.get.response', obj);

                    } catch (e) {
                        e.reply('config.get.response', null);
                    }
                } else {
                    e.reply('config.get.response', null);
                }
            });
        }

    });

    ipcMain.on('config.set', (e, payload) => {

        fs.writeFile(CONFIG_DIR + '/' + CONFIG_FILE, JSON.stringify(payload), (err, file) => {
            if (!err) {
                e.reply('config.set.response', payload);
            } else {
                e.reply('config.set.response', null);
            }
        });


    });

    ipcMain.on('directory.find', (e, arg) => {
        dialog.showOpenDialog({ properties: ['openFile', 'openDirectory'] }).then((dialogResponse) => {
            console.log(dialogResponse); // TESTING!!!
            e.reply('directory.find.response', dialogResponse);
        });

    });

    ipcMain.on('directory.upload', (e, payload) => {

        e.reply('directory.upload.response');
        //TODO:AND follow response pattern
        /*     
        
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
    });

});

function getS3(config) {
    const s3 = new AWS.S3({
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
        sessionToken: config.sessionToken
    });

    return s3;
}
