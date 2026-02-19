import { ControllerEndpointArgs } from "../protocol/ControllerEndpointArgs";

const TOKEN_CONNECTION_ID = 'connectionId';
const TOKEN_TABLE_NAME = 'tableName';

export class RouteParamsAccessor
{
    private readonly _args: ControllerEndpointArgs;

    private get _urlParms(): Record<string, string>
    {
        return this._args.params;
    }

    private get _searchParms(): URLSearchParams
    {
        return this._args.url.searchParams;
    }

    public get connectionId(): number
    {
        return parseInt(this._urlParms[TOKEN_CONNECTION_ID]);
    }

    public get tableName(): string | null
    {
        return this._searchParms.get(TOKEN_TABLE_NAME);
    }

    constructor(args: ControllerEndpointArgs)
    {
        this._args = args;
    }
}

export function endpointArgsGetConnectionId(args: ControllerEndpointArgs): number
{
    const accessor = new RouteParamsAccessor(args);
    return accessor.connectionId;
}

export function endpointArgsTryGetTableName(args: ControllerEndpointArgs): string | null
{
    const accessor = new RouteParamsAccessor(args);
    return accessor.tableName;
}
