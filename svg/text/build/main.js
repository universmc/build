require('dotenv').config(); // Charger les variables d'environnement depuis .env
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');// Importez la fonction de création du menu
const express = require('express');
const electronReload = require('electron-reload');



if (process.env.NODE_ENV === 'development') {
    electronReload(__dirname);
}

const server = express();
server.use(express.json());

server.listen(5001, () => {
    console.log('Serveur Express démarré sur http://localhost:5001');
});

function createWindow() {
    const win = new BrowserWindow({
        width: 987,
        height: 610,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false,
        },
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});