import { ConnectionApiRequestForm } from "../../../shared/domain/models/connections/ConnectionApiRequestForm";
import { ConnectionModel } from "../../../shared/domain/models/connections/ConnectionModel";
import { ServiceResponse } from "../../../shared/domain/ServiceResponses/ServiceResponse";
import { ServiceResponseBase } from "../../../shared/domain/ServiceResponses/ServiceResponseBase";



export interface IConnectionService
{
    getConnections(): ConnectionModel[];
    saveConnection(connectionData: ConnectionApiRequestForm): ServiceResponse<ConnectionModel>;
    saveConnection(connectionData: ConnectionApiRequestForm, connectionId: number): ServiceResponse<ConnectionModel>;
    getConnection(connectionId: number): ServiceResponse<ConnectionModel>;
    deleteConnection(connectionId: number): ServiceResponseBase;
}
