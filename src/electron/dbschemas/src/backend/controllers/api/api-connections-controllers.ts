
import { ConnectionModelApiResponseMapper } from "../../../shared/mappers/basic-mappers/connection-mappers";
import { diConnectionService } from "../../utilities/dependencies";

export async function getConnections(): Promise<Response>
{
    const connService = diConnectionService;
    const mapper = new ConnectionModelApiResponseMapper();
    const models = connService.getConnections();
    const connections = mapper.map(models);
    return Response.json(connections);
}


