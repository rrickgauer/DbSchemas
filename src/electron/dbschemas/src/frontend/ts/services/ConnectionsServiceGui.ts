import { ConnectionApiResponse } from "../../../shared/domain/models/connections/ConnectionApiResponse";
import { ConnectionApiRequestForm } from "../../../shared/domain/models/connections/ConnectionApiRequestForm";
import { ConnectionModel } from "../../../shared/domain/models/connections/ConnectionModel";
import { ServiceResponse } from "../../../shared/domain/ServiceResponses/ServiceResponse";
import { notNull, setNullValues } from "../../../shared/utilities/NullableUtility";
import { ApiConnections } from "../api/ApiConnections";
import { toServiceResponse, toServiceResponseNoContent } from "../utilities/ApiResponseHandlers";
import { ServiceResponseBase } from "../../../shared/domain/ServiceResponses/ServiceResponseBase";
import { ConnectionModelApiResponseMapper } from "../../../shared/mappers/basic-mappers/connections/ConnectionModelApiResponseMapper";

export class ConnectionsServiceGui
{
    private readonly _connectionMapper = new ConnectionModelApiResponseMapper();
    private readonly _api = new ApiConnections();

    public async getConnections(): Promise<ServiceResponse<ConnectionModel[]>>
    {
        const response = await this._api.get();
        const apiServiceResponse = await toServiceResponse<ConnectionApiResponse[]>(response);

        return new ServiceResponse({
            data: apiServiceResponse.data?.map(x => this._connectionMapper.map(x)),
            errorMessage: apiServiceResponse.errorMessage,
        });
    }

    public async createConnection(newConnectionData: ConnectionApiRequestForm): Promise<ServiceResponse<ConnectionModel>>
    {
        const response = await this._api.post(setNullValues(newConnectionData));
        const apiResponse = await toServiceResponse<ConnectionApiResponse>(response);
        const model = notNull(apiResponse.data) ? this._connectionMapper.map(apiResponse.data) : null;

        return new ServiceResponse({
            data: model,
            errorMessage: apiResponse.errorMessage,
        });
    }

    public async saveConnection(connectionId: number, data: ConnectionApiRequestForm): Promise<ServiceResponse<ConnectionModel>>
    {
        const response = await this._api.put(connectionId, setNullValues(data));
        const apiResponse = await toServiceResponse<ConnectionApiResponse>(response);
        const model = notNull(apiResponse.data) ? this._connectionMapper.map(apiResponse.data) : null;

        return new ServiceResponse({
            data: model,
            errorMessage: apiResponse.errorMessage,
        });
    }

    public async getConnection(connectionId: number): Promise<ServiceResponse<ConnectionModel>>
    {
        const response = await this._api.get(connectionId);
        const apiResponse = await toServiceResponse<ConnectionApiResponse>(response);
        const model = notNull(apiResponse.data) ? this._connectionMapper.map(apiResponse.data) : null;

        return new ServiceResponse({
            data: model,
            errorMessage: apiResponse.errorMessage,
        });
    }

    public async deleteConnection(connectionId: number): Promise<ServiceResponseBase>
    {
        const response = await this._api.delete(connectionId);
        return await toServiceResponseNoContent(response);
    }
}


