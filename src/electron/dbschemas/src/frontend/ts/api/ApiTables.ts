import { API_ENDPOINT_CONNECTIONS } from "../../../shared/domain/constants/ApiEndpoints";
import { notNull } from "../../../shared/utilities/NullableUtility";
import { urlToQueryParmString } from "../../../shared/utilities/UrlUtility";

export class ApiTables
{
    private readonly _connectionId: number;
    private readonly _url: string;

    constructor(connectionId: number)
    {
        this._connectionId = connectionId;
        this._url = `${API_ENDPOINT_CONNECTIONS}/${connectionId}/tables`;
    }

    public async get(): Promise<Response>;
    public async get(tableName: string | null): Promise<Response>;
    public async get(tableName?: string | null): Promise<Response>
    {
        const url = this.getUrl(tableName ?? null);
        return await fetch(url);
    }

    private getUrl(): string;
    private getUrl(tableName: string | null): string;
    private getUrl(tableName?: string | null): string
    {
        let url = this._url;

        if (notNull(tableName))
        {
            const queryParms = urlToQueryParmString({
                tableName: tableName,
            });
            url = `${url}?${queryParms}`;
        }

        return url;
    }
    
}
