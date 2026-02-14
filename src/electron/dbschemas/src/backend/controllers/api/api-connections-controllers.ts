
import { ConnectionModelApiResponseMapper } from "../../../shared/mappers/basic-mappers/connection-mappers";
import { ControllerArgs } from "../../protocol/router";
import { diConnectionService } from "../../utilities/dependencies";

export async function getConnections(args: ControllerArgs): Promise<Response>
{
    const connService = diConnectionService;
    const mapper = new ConnectionModelApiResponseMapper();
    const models = connService.getConnections();
    const connections = mapper.map(models);
    return Response.json(connections);
}


export async function postConnection(): Promise<Response>
{
    return new Response();
}

