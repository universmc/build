const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    groqRequest: (message) => ipcRenderer.invoke('groq-request', message),
});