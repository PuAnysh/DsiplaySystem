const electron = require('electron')
const url = require("url")
const path = require("path")
const fs = require('fs');
const { dirname } = require("path")
const fetch = require('electron-fetch').default
const { windowsStore } = require('process')
const { app, BrowserWindow, Menu, ipcMain, remote } = electron;
const {dialog} = require('electron')

// const {dialog} = require('electron').remote;

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

    ipcMain.on("logMsg", (err,data)=> {
        OpenDialog()
        console.log(data)
    })

    

    ipcMain.on("flash", (err)=> {
        Flash().catch(err => {
            console.log(err)
          })
        console.log()
    })

})

function OpenDialog()
{
    dialog.showOpenDialog({
        title: "请选择您喜欢的文件",
        filters: [
            { name: 'Custom File Type', extensions: ['jpg', 'png'] },
          ]
    }).then(result => {
        console.log(result.canceled)
        console.log(result.filePaths)
      }).catch(err => {
        console.log(err)
      })
}

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

async function Flash(){
    var src = path.join(app.getAppPath(), 'templates/img/logo.png');
    var dest = path.join(app.getAppPath(), 'templates/img/fpn_0.png');
    fs.copyFile(src, dest, (err) => { 
        if (err) { 
          console.log("Error Found:", err); 
        }
      }); 
    var dest = path.join(app.getAppPath(), 'templates/img/fpn_1.png');
    fs.copyFile(src, dest, (err) => { 
        if (err) { 
        console.log("Error Found:", err); 
        }
    }); 
    var dest = path.join(app.getAppPath(), 'templates/img/fpn_2.png');
    fs.copyFile(src, dest, (err) => { 
        if (err) { 
        console.log("Error Found:", err); 
        }
    }); 
    var dest = path.join(app.getAppPath(), 'templates/img/fpn_3.png');
    fs.copyFile(src, dest, (err) => { 
        if (err) { 
        console.log("Error Found:", err); 
        }
    }); 
    var dest = path.join(app.getAppPath(), 'templates/img/fpn_4.png');
    fs.copyFile(src, dest, (err) => { 
        if (err) { 
        console.log("Error Found:", err); 
        }
    }); 
}



function CreateWindow(data){
    ip = data.ip
    port = data.port
    mainWindow = new BrowserWindow({
        frame: true,
        height: 1300,
        width: 2000,
        webPreferences: {
            contextIsolation: true,
            enableRemoteModule: false, 
            preload: path.join(__dirname, 'preload.js')
        }
    });
    // mainWindow.webContents.openDevTools();
    //const path = require('path')
    mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
        const filePath = path.join(app.getAppPath(), 'templates/img', item.getFilename());
        console.log(filePath)
        item.setSavePath(filePath);
        //...
    })
    
    mainWindow.setResizable(false)

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "templates/mainWindow.html"),
            protocol: "file",
            slashes: true
        })
    );
    mainWindow.once('ready-to-show', () => {
        mainWindow.show() //to prevent the white screen when loading the window, lets show it when it is ready
    })

    mainWindow.on("close", () => {
        mainWindow = null;
    })
}