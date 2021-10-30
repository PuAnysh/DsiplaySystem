const {
    contextBridge,
    ipcRenderer,
    ipcMain,
    remote
} = require("electron");

window.ipcRenderer = require('electron').ipcRenderer;
// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            //let validChannels = ["ist:quit", "ist:checklist"];
            //if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            //}
        },
        receive: (channel, func) => {
            //let validChannels = ["ist:quit","ist:checklist"];
            //if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            //}
        }
    }
);