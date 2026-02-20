import { TableColumnsRequestData } from "../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { SessionData, SessionWrapper } from "../helpers/session/SessionWrapper";


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

export function sessionSaveOpenTables(openTables: TableColumnsRequestData[])
{
    SESSION.openTables = openTables;
}

export function sessionGetSessionData(): SessionData
{
    return SESSION.getSessionData();
}


