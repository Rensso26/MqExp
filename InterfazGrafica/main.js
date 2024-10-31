const { app, BrowserWindow, globalShortcut } = require('electron');

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        fullscreen: true,
        frame: false,
        kiosk: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
        },
    });
    mainWindow.loadFile(path.join(__dirname, 'build', 'index.html'));

    globalShortcut.register('CommandOrControl+W', () => {

    });

    mainWindow.on('close', (event) => {
        event.preventDefault(); 
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
