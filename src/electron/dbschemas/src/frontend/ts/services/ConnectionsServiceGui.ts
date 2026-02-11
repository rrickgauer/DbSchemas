import { ConnectionModel } from "../../../shared/domain/models/ConnectionModel";
import { ConnectionModelApiResponseMapper } from "../../../shared/mappers/basic-mappers/connection-mappers";
import { ApiConnections } from "../api/ApiConnections";


export class ConnectionsServiceGui
{
    private readonly _connectionMapper = new ConnectionModelApiResponseMapper();

    public async getConnections(): Promise<ConnectionModel[]>
    {
        const api = new ApiConnections();
        const response = await api.get();
        return this._connectionMapper.map(response);
    }
}