const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const fs = require('fs');
const path = require('path');
const tar = require('tar');

const AWS = require('aws-sdk');
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
        height: 1024,
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
            e.reply('config.get.response', null);
        } else {

            fs.readFile(CONFIG_DIR + '/' + CONFIG_FILE, { "encoding": "utf8" }, (err, data) => {

                if (!err) {
                    let obj = {};
                    try {
                        obj = JSON.parse(data);
                        console.log(obj);
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
                e.reply('config.set.response', true);
            } else {
                e.reply('config.set.response', false);
            }
        });


    });

    ipcMain.on('directory.find', (e, arg) => {
        dialog.showOpenDialog({ properties: ['openFile', 'openDirectory'] }).then((dialogResponse) => {
            e.reply('directory.find.response', dialogResponse);
        });

    });


    ipcMain.on('bucket.list', (e, payload) => {
        const accessKeyId = payload.accessKeyId;
        const secretAccessKey = payload.secretAccessKey;
        const region = payload.region;
        const bucket = payload.s3BucketName;
        const bucketOptions = { Bucket: bucket }

        const s3 = getS3(accessKeyId, secretAccessKey, region);

        s3.listObjects(bucketOptions, (err, data) => {
            if (err) {
                e.reply('bucket.list.response', []);
            } else {
                e.reply('bucket.list.response', data.Contents);
            }
        });
    });


    ipcMain.on('directory.download', (e, payload) => {
        const accessKeyId = payload.accessKeyId;
        const secretAccessKey = payload.secretAccessKey;
        const region = payload.region;
        const key = payload.key;
        const bucket = payload.s3BucketName;
        const directoryPath = payload.saveDirectoryPath;

        const s3 = getS3(accessKeyId, secretAccessKey, region);

        let out = tar.x(
            {
                gzip: true,
                cwd: directoryPath,
                keep: false
            }
        );

        out.on('error', () => {
            e.reply('directory.download.response', false);
        });
        var s3Stream = s3.getObject({ Bucket: bucket, Key: key }).createReadStream();

        // Listen for errors returned by the service
        s3Stream.on('error', function (err) {
            e.reply('directory.download.response', false);
            console.error(err);
        });

        s3Stream.pipe(out).on('error', function (err) {
            // capture any errors that occur when writing data to the file
            e.reply('directory.download.response', false);

            console.error('File Stream:', err);
        }).on('close', function () {
            e.reply('directory.download.response', true);
            console.log('Done.');
        });


    });

    ipcMain.on('directory.upload', (e, payload) => {
        const accessKeyId = payload.accessKeyId;
        const secretAccessKey = payload.secretAccessKey;
        const region = payload.region;
        const key = '' + (new Date()) + '.tar.gz';
        const bucket = payload.s3BucketName;
        const directoryPath = payload.saveDirectoryPath;

        const s3 = getS3(accessKeyId, secretAccessKey, region);

        const pass = new stream.PassThrough();
        const bucketOptions = { Bucket: bucket, Body: pass, Key: key };

        pass.on('close', function () {
            console.log(archive.pointer() + ' total bytes');
        });

        pass.on('error', (err) => {
            e.reply('directory.upload.response', false);
        });

        pass.on('end', function () {
            console.log('Upload complete.');
        });

        let tarStream = tar.c(
            {
                gzip: true,
                cwd: directoryPath
            }, ['.']);
            
        tarStream.on('error', () => {
            e.reply('directory.upload.response', false);
        });
        
        tarStream.pipe(pass);

        s3.upload(bucketOptions, (err, data) => {
            console.log(err, data);
            if (err) {
                e.reply('directory.upload.response', false);
            } else {
                e.reply('directory.upload.response', true);
            }
        });





    });

});

function getS3(accessKeyId, secretAccessKey, region) {
    AWS.config.update({
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
        region: region
    });



    return new AWS.S3();
}


