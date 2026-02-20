import { BrowserWindow, Menu, MenuItem, MenuItemConstructorOptions } from "electron";
import { IPC_EVENT_NEW_CONNECTION, IPC_EVENT_REFRESH_CONNECTIONS, IPC_EVENT_TOGGLE_TABLE_COLUMN } from "../../../shared/domain/constants/IpcEventNames";
import { ipcSendMessageToFrontEnd } from "../../utilities/IpcHandlers";
import { IpcEventArgsFilterTableColumn } from "../../../shared/domain/models/ipc-event-args/IpcEventArgs";
import { TableFilterColumn } from "../../../shared/domain/constants/TableColumnFilter";

type ApplicationMenuArgs = {
    menu: Menu;
    window: BrowserWindow;
};


const SEPARATOR_MENU_ITEM: MenuItemConstructorOptions = {
    type: 'separator',
}


const MENU_INDEX_CONNECTIONS = 2;
const MENU_INDEX_TABLES = MENU_INDEX_CONNECTIONS + 1;

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
        // connections
        const connectionsMenu = this.getConnectionsMenu();
        this._menu.insert(MENU_INDEX_CONNECTIONS, connectionsMenu);

        // tables
        const tablesMenu = this.getTablesMenu();
        this._menu.insert(MENU_INDEX_TABLES, tablesMenu);

        Menu.setApplicationMenu(this._menu);
    }

    private getConnectionsMenu(): MenuItem
    {
        const connectionsMenu = new MenuItem({
            label: 'Connections',
            submenu: [
                {
                    label: 'New',
                    click: () => ipcSendMessageToFrontEnd(this._window, IPC_EVENT_NEW_CONNECTION),
                },
                {
                    label: 'Refresh',
                    click: () => ipcSendMessageToFrontEnd(this._window, IPC_EVENT_REFRESH_CONNECTIONS),
                },
            ],
        });

        return connectionsMenu;
    }


    private getTablesMenu(): MenuItem
    {
        const filterMenuItems: MenuItemConstructorOptions[] = [
            this.getFilterMenuItemCheckbox(TableFilterColumn.Position),
            this.getFilterMenuItemCheckbox(TableFilterColumn.Name),
            this.getFilterMenuItemCheckbox(TableFilterColumn.Type),
            this.getFilterMenuItemCheckbox(TableFilterColumn.Nullable),
            this.getFilterMenuItemCheckbox(TableFilterColumn.Default),
            SEPARATOR_MENU_ITEM,
            {
                label: 'Select all'
            },
            {
                label: 'Clear all'
            },
        ];

        const tablesMenu = new MenuItem({
            label: 'Tables',
            submenu: filterMenuItems,
        });

        return tablesMenu;
    }

    private getFilterMenuItemCheckbox(label: TableFilterColumn): MenuItemConstructorOptions
    {
        return {
            label: label,
            type: "checkbox",
            checked: true,

            click: (menuItem, window, event) =>
            {
                const data: IpcEventArgsFilterTableColumn = {
                    columnName: label,
                    isChecked: menuItem.checked,
                };

                ipcSendMessageToFrontEnd(this._window, IPC_EVENT_TOGGLE_TABLE_COLUMN, data);
            },
        };
    }


}