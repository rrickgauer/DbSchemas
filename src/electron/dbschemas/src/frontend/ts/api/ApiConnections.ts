
import { HttpMethods } from "../../../shared/domain/constants/HttpMethods";
import { ConnectionApiResponse } from "../../../shared/domain/models/connections/ConnectionApiResponse";
import { ConnectionApiRequestForm } from "../../../shared/domain/models/connections/ConnectionApiRequestForm";
import { sendJsonApiRequest } from "../utilities/Requests";
import { API_ENDPOINT_CONNECTIONS } from "../../../shared/domain/enums/ApiEndpoints";

export class ApiConnections
{
    private _url = `${API_ENDPOINT_CONNECTIONS}`;

    public async get(): Promise<Response>
    {
        return await fetch(this._url);
    }

    public async post(connectionData: ConnectionApiRequestForm): Promise<Response>
    {
        const url = `${this._url}`;

        return await sendJsonApiRequest(url, {
            data: connectionData,
            method: HttpMethods.POST,
        });
    }
}





