import { DataTable } from "../../../shared/domain/types/types";
import { SqlEngine } from "../sql-engine/SqlEngine";
import { SELECT_ALL_DATABASE_CONNECTIONS } from "./ConnectionCommands";
import { IConnectionRepository } from "./IConnectionRepository";

export class ConnectionRepository implements IConnectionRepository
{
    private readonly _sqlEngine: SqlEngine;

    constructor(sqlEngine: SqlEngine)
    {
        this._sqlEngine = sqlEngine;
    }

    public getAllConnections(): DataTable
    {
        return this._sqlEngine.selectAll(SELECT_ALL_DATABASE_CONNECTIONS) as DataTable;
    }
}


