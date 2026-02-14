
import { ConnectionModelApiResponseMapper } from "../../../shared/mappers/basic-mappers/connection-mappers";
import { ControllerArgs as EndpointArgs } from "../../protocol/router";
import { diConnectionService } from "../../utilities/dependencies";

export async function getConnections(args: EndpointArgs): Promise<Response>
{
    const connService = diConnectionService;
    const mapper = new ConnectionModelApiResponseMapper();
    const models = connService.getConnections();
    const connections = mapper.map(models);
    return Response.json(connections);
}

// POST: /api/connections
export async function postConnection(args: EndpointArgs): Promise<Response>
{
    return new Response();
}

