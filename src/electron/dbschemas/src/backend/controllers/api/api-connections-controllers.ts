import { ConnectionApiRequestForm } from "../../../shared/domain/models/connections/ConnectionApiRequestForm";
import { ConnectionModel } from "../../../shared/domain/models/connections/ConnectionModel";
import { ServiceResponse } from "../../../shared/domain/ServiceResponses/ServiceResponse";
import { ServiceResponseBase } from "../../../shared/domain/ServiceResponses/ServiceResponseBase";
import { OneWayMapper } from "../../../shared/mappers/basic-mappers/basic-mappers";
import { ConnectionModelApiResponseMapper } from "../../../shared/mappers/basic-mappers/connection-mappers";
import { ServiceResponseBaseHttpResponseMapper, ServiceResponseHttpResponseMapper } from "../../../shared/mappers/basic-mappers/ServiceResponseMappers";
import { ControllerArgs as EndpointArgs } from '../../protocol/ControllerArgs';
import { diConnectionService } from "../../utilities/dependencies";

/**
 * POST: /api/connections
 */
export async function apiConnectionsGetAll(args: EndpointArgs): Promise<Response>
{
    const connectionService = diConnectionService;
    const models = connectionService.getConnections();
 
    const mapper = new ConnectionModelApiResponseMapper();
    const connections = mapper.map(models);
 
    return Response.json(connections);
}

/**
 * GET: /api/connections/:connectionId
 */
export async function apiConnectionsGet(args: EndpointArgs): Promise<Response>
{
    const connectionService = diConnectionService;
    const connectionId = getConnectionIdFromArgs(args);
    const getConnection = connectionService.getConnection(connectionId);
    return toApiResponse(getConnection);
}

/**
 * POST: /api/connections
 */
export async function apiConnectionsPost(args: EndpointArgs): Promise<Response>
{
    const connectionService = diConnectionService;
    const requestData = await args.request.json() as ConnectionApiRequestForm;
    const createConnection = connectionService.saveConnection(requestData);
    return toApiResponse(createConnection);
}

/**
 * PUT: /api/connections/:connectionId
 */
export async function apiConnectionsPut(args: EndpointArgs): Promise<Response>
{
    const connectionService = diConnectionService;
    const requestData = await args.request.json() as ConnectionApiRequestForm;
    const connectionId = getConnectionIdFromArgs(args);
    const saveConnectionResponse = connectionService.saveConnection(requestData, connectionId);
    return toApiResponse(saveConnectionResponse);
}


/**
 * DELETE: /api/connections/:connectionId
 */
export async function apiConnectionsDelete(args: EndpointArgs): Promise<Response>
{
    const connectionService = diConnectionService;
    const connectionId = getConnectionIdFromArgs(args);
    const deleteResponse = connectionService.deleteConnection(connectionId);
    return toApiResponse(deleteResponse);
}


function toApiResponse(serviceResponse: ServiceResponse<ConnectionModel>): Response;
function toApiResponse(serviceResponse: ServiceResponseBase): Response;
function toApiResponse(serviceResponse: ServiceResponse<ConnectionModel> | ServiceResponseBase ): Response
{
    let mapper: OneWayMapper<unknown, Response>;

    if (serviceResponse instanceof ServiceResponse)
    {
        mapper = new ServiceResponseHttpResponseMapper();
    }
    else
    {
        mapper = new ServiceResponseBaseHttpResponseMapper();
    }

    return mapper.map(serviceResponse);
}

function getConnectionIdFromArgs(args: EndpointArgs): number
{
    return parseInt(args.params['connectionId']);
}

