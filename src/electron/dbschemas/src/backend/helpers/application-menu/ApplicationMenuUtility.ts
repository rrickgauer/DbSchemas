import { Menu } from "electron";
import { TableFilterColumn } from "../../../shared/domain/constants/TableColumnFilter";
import { IpcEventArgsFilterTableColumn } from "../../../shared/domain/models/ipc-event-args/IpcEventArgs";

export const MENU_INDEX_CONNECTIONS = 2;
export const MENU_INDEX_TABLES = MENU_INDEX_CONNECTIONS + 1;
export const MENU_INDEX_COLUMNS = MENU_INDEX_TABLES + 1;

export function getCurrentFilterTableColumnMenuItems(): IpcEventArgsFilterTableColumn[] | null
{
    const menu = Menu.getApplicationMenu();
    const columnsMenu = menu?.items[MENU_INDEX_COLUMNS];
    const columns = columnsMenu?.submenu?.items.filter(i => i.type === "checkbox");
    if (columns == null)
    {
        return null;
    }

    return columns.map(c => ({
        columnName: c.label as TableFilterColumn,
        isChecked: c.checked,
    }));
}
