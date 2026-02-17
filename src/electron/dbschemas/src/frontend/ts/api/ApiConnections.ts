
import { HttpMethods } from "../../../shared/domain/constants/HttpMethods";
import { ConnectionApiRequestForm } from "../../../shared/domain/models/connections/ConnectionApiRequestForm";
import { sendJsonApiRequest } from "../utilities/RequestUtility";
import { API_ENDPOINT_CONNECTIONS } from "../../../shared/domain/constants/ApiEndpoints";

export class ApiConnections
{
    private _url = `${API_ENDPOINT_CONNECTIONS}`;

    public async get(): Promise<Response>;
    public async get(connectionId: number): Promise<Response>;
    public async get(connectionId?: number): Promise<Response>
    {
        let url = this.getUrl(connectionId!);
        return await fetch(url);
    }

    public async post(connectionData: ConnectionApiRequestForm): Promise<Response>
    {
        const url = this.getUrl();

        return await sendJsonApiRequest(url, {
            data: connectionData,
            method: HttpMethods.POST,
        });
    }

    public async put(connectionId: number, data: ConnectionApiRequestForm): Promise<Response>
    {
        const url = this.getUrl(connectionId);

        return await sendJsonApiRequest(url, {
            data: data,
            method: HttpMethods.PUT,
        });
    }

    public async delete(connectionId: number): Promise<Response>
    {
        const url = this.getUrl(connectionId);

        return await fetch(url, {
            method: HttpMethods.DELETE,
        });
    }

    private getUrl(): string;
    private getUrl(connectionId: number): string;
    private getUrl(connectionId?: number): string
    {
        let url = this._url;
        if (connectionId != null)
        {
            url += `/${connectionId}`;
        }

        return url;
    }
}




