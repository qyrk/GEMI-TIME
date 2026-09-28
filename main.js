const { app, BrowserWindow, powerSaveBlocker } = require('electron');
const path = require('path');

// Prevent system power saving / sleep from pausing app timers
powerSaveBlocker.start('prevent-app-suspension');

function createWindow() {
  const win = new BrowserWindow({
    width: 400,
    height: 600,
    icon: path.join(__dirname, 'icon.ico'), // <--- ADD THIS LINE
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      backgroundThrottling: false // Prevents Chromium from slowing down timers in background
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});