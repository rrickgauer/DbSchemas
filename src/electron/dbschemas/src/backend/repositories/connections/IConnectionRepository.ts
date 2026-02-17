import { ConnectionApiRequestForm } from "../../../shared/domain/models/connections/ConnectionApiRequestForm";
import { DataRow, DataTable } from "../../../shared/domain/types/CustomTypes";


export interface IConnectionRepository
{
    getAllConnections(): DataTable
    insertConnection(newConnectionData: ConnectionApiRequestForm): number;
    updateConnection(connectionId: number, data: ConnectionApiRequestForm): number;
    getConnection(connectionId: number): DataRow | null;
    deleteConnection(connectionId: number): number;
}   


