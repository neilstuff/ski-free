'use strict';

const config = require('./config.json');

const electron = require('electron');
const { app } = electron;
const { protocol } = electron;
const { ipcMain } = electron;
const { dialog } = electron;
const { shell } = electron;
const { webContents } = electron;
const { contextBridge } = electron;

const BrowserWindow = electron.BrowserWindow;

const mime = require('mime');
const path = require('path');
const url = require('url');
const fs = require('fs');
const os = require('os');

var mainWindow = null;

function createWindow() {

    mainWindow = new BrowserWindow({
        width: (config.mode == "debug") ? 900 : 550,
        height: 550,
        resizable: false,
        frame: true,
        autoHideMenuBar: true,

        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, "preload.js")
        }

    });

    if (config.mode == "debug") {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.setMenu(null);
    mainWindow.setTitle('Ski Free') // Window name isn't this
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'html',
        slashes: true
    }))

    mainWindow.on('closed', () => {
        mainWindow = null
    })

}

app.on('ready', () => {

    protocol.registerBufferProtocol('html', function(request, callback) {
        let pathName = (new URL(request.url).pathname).substring(os.platform() == 'win32' ? 1 : 0);
        let extension = path.extname(pathName);

        if (extension == "") {
            extension = ".js";
            pathName += extension;
        }

        return callback({ data: fs.readFileSync(path.normalize(pathName)), mimeType: mime.getType(extension) });

    });

    createWindow();

});

app.on('window-all-closed', () => {
    app.quit()
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }

});

ipcMain.on('quit', function(event, arg) {

    app.quit();

});

ipcMain.on('minimize', function(event, arg) {

    mainWindow.minimize();

});

ipcMain.on('isMaximized', function(event, arg) {

    event.returnValue = mainWindow.isMaximized();

});

ipcMain.on('maximize', function(event, arg) {

    mainWindow.maximize();

});

ipcMain.on('unmaximize', function(event, arg) {

    mainWindow.unmaximize();

});

ipcMain.on('showPrintDialog', async function(event, arg) {
    var result = await dialog.showSaveDialog({
            properties: [
                { createDirectory: true }
            ],
            filters: [
                { name: 'pdf', extensions: ['pdf'] },
                { name: 'All Files', extensions: ['*'] }
            ]
        }

    );

    event.returnValue = result;

});

ipcMain.on('printToPdf', function(event, arg) {
    var filePath = arg;

    let win = BrowserWindow.getFocusedWindow();

    //Use default printing options
    win.webContents.printToPDF({}).then(data => {

        fs.writeFile(filePath, data, function(error) {
            event.sender.send('wrote-pdf', filePath)
        })

    })

});

ipcMain.on('showOpenDialog', async function(event) {
    var result = await dialog.showOpenDialog(os.type() == 'Windows_NT' ? {
            properties: ['createDirectory'],
            filters: [
                { name: 'zip', extensions: ['zip'] },
                { name: 'All Files', extensions: ['*'] }
            ]
        } : {
            properties: ['openFile', 'openDirectory', 'createDirectory'],
            filters: [
                { name: 'zip', extensions: ['zip'] },
                { name: 'All Files', extensions: ['*'] }
            ]
        }

    );

    event.returnValue = result;

});

ipcMain.on('showSaveDialog', async function(event, arg) {
    var filename = arg;

    var result = await dialog.showSaveDialog({
            defaultPath: filename,
            properties: [
                { createDirectory: true }
            ],
            filters: [
                { name: 'zip', extensions: ['zip'] },
                { name: 'All Files', extensions: ['*'] }
            ]
        }

    );

    event.returnValue = result;

});

ipcMain.on('openUrl', function(event, arg) {
    var url = arg;

    shell.openExternal(url);

});