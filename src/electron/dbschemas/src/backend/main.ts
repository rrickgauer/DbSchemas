import { app, BrowserWindow, ipcMain, protocol } from 'electron';
import { router } from './protocol/RoutesMapper';
import { buildApplicationWindow, openFilePicker } from './main-routines';
import { IPC_EVENT_OPEN_FILE_PICKER } from '../shared/domain/constants/IpcEventNames';

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


ipcMain.handle(IPC_EVENT_OPEN_FILE_PICKER, async (event) =>
{
    const win = BrowserWindow.fromWebContents(event.sender)!;
    return await openFilePicker(win);
});
