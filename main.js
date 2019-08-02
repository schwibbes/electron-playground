'use strict';

const {app, BrowserWindow, ipcMain} = require('electron');
const { trayIcon } = require("./trayIcon");
const { menuBar } = require("./menuBar");
const path = require('path');
const { exec } = require('child_process');
const fs = require('fs');

// keep as global, so it does not run out-of-scope
let main_window;

app.on('ready', function(){
  if (main_window == null){
    main_window = new BrowserWindow({
      width: 1200,
      height: 700, 
      webPreferences: {
        nodeIntegration: true
      }
    });
  }
  main_window.loadURL('file://' + __dirname + '/index.html');
  
  // dev environment
  main_window.maximize()
  //main_window.webContents.openDevTools();
  
  trayIcon(path.join(__dirname, 'icon.jpg'), main_window);
  menuBar(main_window)
});

ipcMain.on('apply-config', (event, arg) => {
  console.log("apply config: " + arg);

  let data = JSON.stringify(arg, null, 2);

  fs.writeFile(path.join(app.getPath('userData'), 'sample.json'), data, (err) => {
    if (err) throw err;
  });

  exec("java -version", (error, stdout, stderr) => { 
    event.reply('apply-success', 'pong')
  });
});

function userStore() {
  return process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + 'Library/Preferences' : process.env.HOME + "/.local/share")
}

