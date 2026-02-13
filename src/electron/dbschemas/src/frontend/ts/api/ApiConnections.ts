import { ConnectionApiResponse } from "../../../shared/domain/models/ConnectionApiResponse";
import { API_ENDPOINT_CONNECTIONS } from "./api-endpoints";



export class ApiConnections
{
    private _url = `${API_ENDPOINT_CONNECTIONS}`;

    public async get(): Promise<ConnectionApiResponse[]>
    {
        const response = await fetch(this._url);

        return await response.json();
    }
}