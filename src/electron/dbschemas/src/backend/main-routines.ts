import { BrowserWindow, Menu } from "electron";
import path from "path";
import { ApplicationMenu } from "./helpers/application-menu/ApplicationMenu";

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

    const menuBuilder = new ApplicationMenu({
        menu: existingMenu,
        window: browserWindow,
    });

    menuBuilder.setupApplicationMenu();
}


