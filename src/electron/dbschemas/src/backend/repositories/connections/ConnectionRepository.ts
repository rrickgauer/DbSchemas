import { DataTable } from "../../../shared/domain/types/types";
import { SqlEngine } from "../sql-engine/SqlEngine";
import { SELECT_ALL_DATABASE_CONNECTIONS } from "./ConnectionCommands";
import { IConnectionRepository } from "./IConnectionRepository";

export class ConnectionRepository implements IConnectionRepository
{
    public getAllConnections(): DataTable
    {
        const sqlEngine = new SqlEngine();
        return sqlEngine.selectAll(SELECT_ALL_DATABASE_CONNECTIONS) as DataTable;
    }
}


