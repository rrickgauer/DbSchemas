import { ConnectionApiRequestForm } from "../../../shared/domain/models/connections/ConnectionApiRequestForm";
import { DataRow, DataTable } from "../../../shared/domain/types/types";
import { SqlEngine } from "../sql-engine/SqlEngine";
import { SQL_COMMAND_DELETE_CONNECTION, SQL_COMMAND_INSERT_NEW_CONNECTION, SQL_COMMAND_SELECT_ALL_CONNECTIONS, SQL_COMMAND_SELECT_CONNECTION, SQL_COMMAND_UPDATE_CONNECTION } from './ConnectionCommands';
import { IConnectionRepository } from "./IConnectionRepository";

export class ConnectionRepository implements IConnectionRepository
{
    private readonly _sqlEngine: SqlEngine;

    constructor (sqlEngine: SqlEngine)
    {
        this._sqlEngine = sqlEngine;
    }

    public insertConnection(newConnectionData: ConnectionApiRequestForm): number
    {
        return this._sqlEngine.modifyReturningRowId(SQL_COMMAND_INSERT_NEW_CONNECTION, {
            name: newConnectionData.name,
            database_type_id: newConnectionData.connectionType,
            database_name: newConnectionData.databaseName,
            file: newConnectionData.file,
            host: newConnectionData.host,
            password: newConnectionData.password,
            username: newConnectionData.username,
        });
    }

    public getAllConnections(): DataTable
    {
        return this._sqlEngine.selectAll(SQL_COMMAND_SELECT_ALL_CONNECTIONS) as DataTable;
    }

    public getConnection(connectionId: number): DataRow | null
    {
        return this._sqlEngine.select(SQL_COMMAND_SELECT_CONNECTION, {
            id: connectionId,
        });
    }

    public updateConnection(connectionId: number, data: ConnectionApiRequestForm): number
    {
        return this._sqlEngine.modify(SQL_COMMAND_UPDATE_CONNECTION, {
            name: data.name,
            database_type_id: data.connectionType,
            database_name: data.databaseName,
            file: data.file,
            host: data.host,
            password: data.password,
            username: data.username,
            id: connectionId,
        });
    }

    public deleteConnection(connectionId: number): number
    {
        return this._sqlEngine.modify(SQL_COMMAND_DELETE_CONNECTION, {
            id: connectionId,
        });
    }
}


