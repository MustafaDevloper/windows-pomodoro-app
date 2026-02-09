const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    width: 700,
    height: 1200,
    minWidth: 600,
    minHeight: 900,
    icon: path.join(__dirname, "study-time-logo.png"),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js")
    },
    frame: false,
    show: false
  });

  win.once('ready-to-show', () => {
    win.show();
  });

  win.loadFile(path.join(__dirname, "renderer/index.html"));
  
  // Geliştirme başlıkları
  // win.webContents.openDevTools();

  // Pencere kontrol komutları
  ipcMain.on('minimize', () => win.minimize());
  ipcMain.on('maximize', () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });
  ipcMain.on('close', () => win.close());
}

app.whenReady().then(createWindow);

// macOS için gerekli - tüm pencereler kapatız izin ver
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// macOS için - uygulama aktif olduğunda pencereyi aç
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
