const electron = require('electron')
const url = require("url")
const path = require("path")
const { dirname } = require("path")
const fetch = require('electron-fetch').default

const { app, BrowserWindow, Menu, ipcMain, remote } = electron;

let loginWindow, mainWindow;
var ip, port

app.on("ready", ()=> {
    loginWindow = new BrowserWindow({
        frame: false,
        height: 550,
        width: 400,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false, 
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // loginWindow.webContents.openDevTools();
    // loginWindow.setResizable(false);

    loginWindow.once('ready-to-show', () => {
        loginWindow.show() //to prevent the white screen when loading the window, lets show it when it is ready
    })

    loginWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "templates/loginWindow.html"),
            protocol: "file",
            slashes: true
        })
    )

    ipcMain.on("closeBtn", ()=> {
        app.quit()
        loginWindow = null
        mainWindow = null
        
    })
    
    ipcMain.on("loginData", (err, data)=> {
        console.log(data)
        login(data)
        
    })

})

async function login(data){
    let statususer
    await fetch(`http://${data.ip}:${data.port}/hello`, {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `hello`
    })
    .then(res => res.text())
    .then((body) => {
        statususer = body
    })
    await console.log(statususer)
    if(statususer == 'error'){
        console.log("False Login Information, try Again!")
    }else{
        CreateWindow(data)
        loginWindow.close();
        loginWindow = null
    }

}


function CreateWindow(data){
    ip = data.ip
    port = data.port
    mainWindow = new BrowserWindow({
        frame: true,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false, 
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.setResizable(false)

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "templates/mainWindow.html"),
            protocol: "file",
            slashes: true
        })
    );

    mainWindow.on("close", () => {
        mainWindow = null;
    })
}