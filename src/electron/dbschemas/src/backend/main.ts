import { app, protocol } from 'electron';
import { router } from './protocol/RoutesMapper';
import { buildApplicationWindow } from './main-routines';

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

    const appWindow = buildApplicationWindow();
    appWindow.maximize();
    appWindow.loadURL('app:///home');

    // win.webContents.openDevTools();
});


app.on('window-all-closed', () =>
{
    if (process.platform !== 'darwin') 
    {
        app.quit();
    }
});
