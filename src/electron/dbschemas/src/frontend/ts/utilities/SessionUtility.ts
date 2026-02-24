import { TableColumnsRequestData } from "../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { SessionWrapper } from "../helpers/session/SessionWrapper";
import { SessionData } from "../helpers/session/SessionData";

const SESSION = new SessionWrapper();

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


