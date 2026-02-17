import { HTTP_RESPONSE_NOT_FOUND } from "../../../shared/domain/constants/HttpResponses";
import { ConnectionModel } from "../../../shared/domain/models/connections/ConnectionModel";
import { ServiceResponseHttpResponseMapper } from "../../../shared/mappers/basic-mappers/service-responses/ServiceResponseHttpResponseMapper";
import { isNull } from "../../../shared/utilities/NullableUtility";
import { endpointArgsGetConnectionId, endpointArgsTryGetTableName } from "../../helpers/RouteParamsAccessor";
import { ControllerEndpointArgs } from "../../protocol/ControllerEndpointArgs";
import { diConnectionService, diSchemaReaderService } from "../../utilities/DependencyInjectionUtility";


const serviceResponseMapper = new ServiceResponseHttpResponseMapper();

/**
 * GET: /api/connections/:connectionId/tables?tableName
 */
export async function apiTablesGetAll(args: ControllerEndpointArgs): Promise<Response>
{
    // fetch the connection model via the connectionId from the request url parms
    const connectionModel = getConnectionModelFromArgs(args);
    if (connectionModel instanceof Response)
    {
        return connectionModel;
    }

    const tableName = endpointArgsTryGetTableName(args);
    if (isNull(tableName))
    {
        // fetch the connection's tables
        const schemaReaderService = diSchemaReaderService;
        const getTables = await schemaReaderService.getAllTableNames(connectionModel);

        return serviceResponseMapper.map(getTables);
    }
    else
    {
        // fetch table columns
        const schemaReaderService = diSchemaReaderService;
        const getColumns = await schemaReaderService.getTableColumns(connectionModel, tableName);
        return serviceResponseMapper.map(getColumns);
    }
}


function getConnectionModelFromArgs(args: ControllerEndpointArgs): ConnectionModel | Response
{
    const connectionId = endpointArgsGetConnectionId(args);
    const connectionService = diConnectionService;
    const getConnection = connectionService.getConnection(connectionId);

    if (getConnection.hasError())
    {
        return serviceResponseMapper.map(getConnection);
    }

    if (getConnection.data == null)
    {
        return HTTP_RESPONSE_NOT_FOUND;
    }

    return getConnection.data;
}



