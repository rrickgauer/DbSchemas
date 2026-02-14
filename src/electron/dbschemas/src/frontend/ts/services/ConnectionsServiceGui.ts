
import { ConnectionApiResponse } from "../../../shared/domain/models/connections/ConnectionApiResponse";
import { ConnectionModel } from "../../../shared/domain/models/connections/ConnectionModel";
import { ServiceResponse } from "../../../shared/domain/ServiceResponses/ServiceResponse";
import { ConnectionModelApiResponseMapper } from "../../../shared/mappers/basic-mappers/connection-mappers";
import { ApiConnections } from "../api/ApiConnections";
import { toServiceResponse } from "../api/responses";

export class ConnectionsServiceGui
{
    private readonly _connectionMapper = new ConnectionModelApiResponseMapper();

    public async getConnections(): Promise<ServiceResponse<ConnectionModel[]>>
    {
        const api = new ApiConnections();
        const response = await api.get();
        const apiServiceResponse = await toServiceResponse<ConnectionApiResponse[]>(response);

        return new ServiceResponse({
            data: apiServiceResponse.data?.map(x => this._connectionMapper.map(x)),
            errorMessage: apiServiceResponse.errorMessage,
        });
    }
}