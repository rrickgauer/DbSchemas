import { app, BrowserWindow, protocol } from 'electron';
import path from 'path';
import { router } from './protocol/RoutesMapper';

protocol.registerSchemesAsPrivileged([
    {
        scheme: 'app',
        privileges: {
            standard: true,
            secure: true,
            supportFetchAPI: true,
            corsEnabled: true
        }
    }
]);


app.whenReady().then(() =>
{
    protocol.handle('app', (req) => router.handle(req));

    const win = new BrowserWindow({
        webPreferences: {
            devTools: true,
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    win.maximize();

    win.loadURL('app:///home');

    // win.webContents.openDevTools();
});


app.on('window-all-closed', () =>
{
    if (process.platform !== 'darwin') 
    {
        app.quit();
    }
});

