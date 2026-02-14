import { ConnectionApiRequestForm } from "../../../shared/domain/models/connections/ConnectionApiRequestForm";
import { DataRow, DataTable } from "../../../shared/domain/types/types";
import { SqlEngine } from "../sql-engine/SqlEngine";
import { insert_new_connection, SELECT_ALL_DATABASE_CONNECTIONS } from "./ConnectionCommands";
import { IConnectionRepository } from "./IConnectionRepository";

export class ConnectionRepository implements IConnectionRepository
{
    private readonly _sqlEngine: SqlEngine;

    constructor(sqlEngine: SqlEngine)
    {
        this._sqlEngine = sqlEngine;
    }

    public insertConnection(newConnectionData: ConnectionApiRequestForm): number
    {
        return this._sqlEngine.modifyReturningRowId(insert_new_connection, {
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
        return this._sqlEngine.selectAll(SELECT_ALL_DATABASE_CONNECTIONS) as DataTable;
    }
}


