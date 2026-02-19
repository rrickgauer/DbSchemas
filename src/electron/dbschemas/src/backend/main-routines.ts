import { BrowserWindow, Menu, MenuItem } from "electron";
import { IPC_EVENT_NEW_CONNECTION, IPC_EVENT_REFRESH_CONNECTIONS } from "../shared/domain/constants/IpcEventNames";
import path from "path";


export function buildApplicationWindow(): BrowserWindow
{
    const win = new BrowserWindow({
        webPreferences: {
            devTools: true,
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    setApplicationMenu(win);

    return win;
}

export function setApplicationMenu(browserWindow: BrowserWindow): void
{
    const existingMenu = Menu.getApplicationMenu();
    if (existingMenu == null)
    {
        return;
    }

    const connectionsMenu = new MenuItem({
        label: 'Connections',
        submenu: [
            {
                label: 'New',
                click: () => browserWindow.webContents.send(IPC_EVENT_NEW_CONNECTION),
            },
            {
                label: 'Refresh',
                click: () => browserWindow.webContents.send(IPC_EVENT_REFRESH_CONNECTIONS),
            },
        ],
    });

    existingMenu.insert(2, connectionsMenu);
    Menu.setApplicationMenu(existingMenu);
}