
import { ConnectionTableMapper } from "../../shared/mappers/table-mappers/ConnectionTableMapper";
import { ConnectionRepository } from "../repositories/connections/ConnectionRepository";
import { IConnectionRepository } from "../repositories/connections/IConnectionRepository";
import { ConnectionService } from "../services/connections/ConnectionService";


export const connectionsRepository: IConnectionRepository = new ConnectionRepository();
export const connectionTableMapper: ConnectionTableMapper = new ConnectionTableMapper();

export const connectionService: ConnectionService = new ConnectionService({
    mapper: connectionTableMapper,
    repo: connectionsRepository,
});




