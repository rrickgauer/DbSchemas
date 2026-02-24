import { BrowserWindow, Menu, MenuItem, MenuItemConstructorOptions } from "electron";
import { IPC_EVENT_NEW_CONNECTION, IPC_EVENT_REFRESH_CONNECTIONS, IPC_EVENT_SHOW_ALL_TABLE_COLUMNS, IPC_EVENT_TOGGLE_TABLE_COLUMN } from "../../../shared/domain/constants/IpcEventNames";
import { ipcSendMessageToFrontEnd } from "../../utilities/IpcHandlers";
import { IpcEventArgsFilterTableColumn } from "../../../shared/domain/models/ipc-event-args/IpcEventArgs";
import { TableFilterColumn } from "../../../shared/domain/constants/TableColumnFilter";
import { MENU_INDEX_CONNECTIONS, MENU_INDEX_COLUMNS } from "./ApplicationMenuUtility";

type ApplicationMenuArgs = {
    menu: Menu;
    window: BrowserWindow;
};

const SEPARATOR_MENU_ITEM: MenuItemConstructorOptions = {
    type: 'separator',
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
        // connections
        const connectionsMenu = this.getConnectionsMenu();
        this._menu.insert(MENU_INDEX_CONNECTIONS, connectionsMenu);

        // columns
        const tablesMenu = this.getColumnsMenu();
        this._menu.insert(MENU_INDEX_COLUMNS, tablesMenu);

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


    private getColumnsMenu(): MenuItem
    {
        const filterMenuItems: MenuItemConstructorOptions[] = [
            this.getFilterMenuItemCheckbox(TableFilterColumn.Position),
            this.getFilterMenuItemCheckbox(TableFilterColumn.Name, false),
            this.getFilterMenuItemCheckbox(TableFilterColumn.Type),
            this.getFilterMenuItemCheckbox(TableFilterColumn.Nullable),
            this.getFilterMenuItemCheckbox(TableFilterColumn.Default),
            SEPARATOR_MENU_ITEM,
            {
                label: 'Select all...',
                click: () =>
                {
                    const columnsMenu = Menu.getApplicationMenu()?.items[MENU_INDEX_COLUMNS];
                    const checkboxes = columnsMenu?.submenu?.items.filter(i => i.type === "checkbox");
                    checkboxes?.forEach(i => i.checked = true);

                    ipcSendMessageToFrontEnd(this._window, IPC_EVENT_SHOW_ALL_TABLE_COLUMNS);
                },
            },
            {
                label: 'Clear all',
                enabled: false,
            },
        ];

        const tablesMenu = new MenuItem({
            label: 'Columns',
            submenu: filterMenuItems,
        });

        return tablesMenu;
    }


    private getFilterMenuItemCheckbox(label: TableFilterColumn): MenuItemConstructorOptions;
    private getFilterMenuItemCheckbox(label: TableFilterColumn, isEnabled: boolean | null): MenuItemConstructorOptions;
    private getFilterMenuItemCheckbox(label: TableFilterColumn, isEnabled?: boolean | null): MenuItemConstructorOptions
    {
        return {
            label: label,
            type: "checkbox",
            checked: true,
            enabled: isEnabled ?? true,

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
