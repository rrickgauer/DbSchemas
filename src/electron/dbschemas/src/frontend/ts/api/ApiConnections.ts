
import { HttpMethods } from "../../../shared/domain/constants/HttpMethods";
import { ConnectionApiResponse } from "../../../shared/domain/models/connections/ConnectionApiResponse";
import { ConnectionFormApiRequest } from "../../../shared/domain/models/connections/ConnectionFormApiRequest";
import { sendJsonApiRequest } from "../utilities/Requests";
import { API_ENDPOINT_CONNECTIONS } from "./ApiEndpoints";

export class ApiConnections
{
    private _url = `${API_ENDPOINT_CONNECTIONS}`;

    public async get(): Promise<ConnectionApiResponse[]>
    {
        const response = await fetch(this._url);

        return await response.json();
    }

    public async post(connectionData: ConnectionFormApiRequest): Promise<ConnectionApiResponse>
    {
        const url = `${this._url}`;

        const response = await sendJsonApiRequest(url, {
            data: connectionData,
            method: HttpMethods.POST,
        });

        return await response.json();
    }
}





