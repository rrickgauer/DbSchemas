

import { ConnectionApiRequestForm } from "../../../shared/domain/models/connections/ConnectionApiRequestForm";
import { ConnectionModel } from "../../../shared/domain/models/connections/ConnectionModel";
import { ServiceResponse } from "../../../shared/domain/ServiceResponses/ServiceResponse";
import { ConnectionModelApiResponseMapper } from "../../../shared/mappers/basic-mappers/connection-mappers";
import { isNull, notNull } from "../../../shared/utilities/nullable";
import { ControllerArgs as EndpointArgs } from "../../protocol/router";
import { diConnectionService } from "../../utilities/dependencies";
import { Nullable } from '../../../shared/domain/types/types';


const mapper = new ConnectionModelApiResponseMapper();

export async function getConnections(args: EndpointArgs): Promise<Response>
{
    const connService = diConnectionService;
    
    const models = connService.getConnections();
    const connections = mapper.map(models);
    return Response.json(connections);
}

// POST: /api/connections
export async function postConnection(args: EndpointArgs): Promise<Response>
{
    const connService = diConnectionService;
    const requestData = await args.request.json() as ConnectionApiRequestForm;
    const createConnection = connService.createConnection(requestData);
    return toApiResponse(createConnection);
}


function toApiResponse(serviceResponse: ServiceResponse<ConnectionModel>): Response
{
    if (serviceResponse.hasError())
    {
        return new Response(serviceResponse.errorMessage);
    }

    let body: Nullable<string> = null;

    if (serviceResponse.data != null)
    {
        body = JSON.stringify(mapper.map(serviceResponse.data));
    }

    return new Response(body);
}

