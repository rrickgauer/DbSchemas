import { TableColumnsRequestData } from "../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { SessionWrapper } from "../helpers/session/SessionWrapper";
import { SessionData } from "../helpers/session/SessionData";
import { TableFilterColumn } from "../../../shared/domain/constants/TableColumnFilter";


const SESSION = new SessionWrapper();

type TableFilterColumnMap = Map<TableFilterColumn, boolean>;



export function sessionSetOpenTableColumns(isChecked: boolean): void;
export function sessionSetOpenTableColumns(isChecked: boolean, column: TableFilterColumn): void;
export function sessionSetOpenTableColumns(isChecked: boolean, column?: TableFilterColumn): void
{
    const sessionData = sessionGetSessionData();
    const list = sessionData.visibleOpenTableColumns;

    console.log('hi');

    if (column != null)
    {
        const element = list.find(x => x.columnName === column) ?? null;
        if (element != null)
        {
            element.isChecked = isChecked;
        }
    }
    else
    {
        for(const item of list)
        {
            item.isChecked = isChecked;
        }
    }

    sessionData.visibleOpenTableColumns = list;
    SESSION.saveSessionData(sessionData);
}

export function sessionGetOpenTableColumns(): TableFilterColumnMap
{
    const list = sessionGetSessionData().visibleOpenTableColumns;

    const result = new Map<TableFilterColumn, boolean>();

    list.forEach((x) => {
        result.set(x.columnName, x.isChecked);
    });

    return result;
}


export function sessionAppendOpenTable(tableData: TableColumnsRequestData): TableColumnsRequestData[]
{
    const openTables = sessionGetOpenTables();
    openTables.push(tableData);
    sessionSaveOpenTables(openTables);

    return sessionGetOpenTables();
}

export function sessionRemoveOpenTable(tableData: TableColumnsRequestData): TableColumnsRequestData[]
{
    const index = sessionGetOpenTableIndex(tableData);
    
    if (index != null)
    {
        const tables = sessionGetOpenTables();
        tables.splice(index, 1);
        sessionSaveOpenTables(tables);
    }

    return sessionGetOpenTables();
}

export function sessionGetOpenTableIndex(tableData: TableColumnsRequestData): number | null
{
    const tables = sessionGetOpenTables();

    const index = tables.findIndex(t => t.connectionId === tableData.connectionId && t.tableName === tableData.tableName);

    if (index === -1)
    {
        return null;
    }
    else
    {
        return index;
    }
}

export function sessionGetOpenTables(): TableColumnsRequestData[]
{
    return SESSION.openTables;
}

export function sessionSaveOpenTables(openTables: TableColumnsRequestData[]): void
{
    SESSION.openTables = openTables;
}

export function sessionSaveIsSidebarOpen(isOpen: boolean): void
{
    SESSION.isSidebarOpen = isOpen;
}

export function sessionGetIsSidebarOpen(): boolean
{
    return SESSION.isSidebarOpen;
}

export function sessionGetSessionData(): SessionData
{
    return SESSION.getSessionData();
}


