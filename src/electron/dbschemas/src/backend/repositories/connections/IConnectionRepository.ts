import { ConnectionApiRequestForm } from "../../../shared/domain/models/connections/ConnectionApiRequestForm";
import { DataRow, DataTable } from "../../../shared/domain/types/types";


export interface IConnectionRepository
{
    getAllConnections(): DataTable
    insertConnection(newConnectionData: ConnectionApiRequestForm): number;
}   


