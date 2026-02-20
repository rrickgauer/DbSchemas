import { BrowserWindow, Menu, MenuItem } from "electron";
import { IPC_EVENT_NEW_CONNECTION, IPC_EVENT_REFRESH_CONNECTIONS } from "../../../shared/domain/constants/IpcEventNames";

type ApplicationMenuArgs = {
    menu: Menu;
    window: BrowserWindow;
};

export class ApplicationMenu
{
    private _menu: Menu;
    private _window: BrowserWindow;

    constructor(args: ApplicationMenuArgs)
    {
        this._menu = args.menu;
        this._window = args.window;
    }

    public setupApplicationMenu(): void
    {
        const connectionsMenu = this.buildConnectionsMenu();
        this._menu.insert(2, connectionsMenu);

        Menu.setApplicationMenu(this._menu);
    }

    private buildConnectionsMenu(): MenuItem
    {
        const connectionsMenu = new MenuItem({
            label: 'Connections',
            submenu: [
                {
                    label: 'New',
                    click: () => this._window.webContents.send(IPC_EVENT_NEW_CONNECTION),
                },
                {
                    label: 'Refresh',
                    click: () => this._window.webContents.send(IPC_EVENT_REFRESH_CONNECTIONS),
                },
            ],
        });

        return connectionsMenu;
    }
}