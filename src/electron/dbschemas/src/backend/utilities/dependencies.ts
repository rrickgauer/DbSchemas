
import { ConnectionTableMapper } from "../../shared/mappers/table-mappers/ConnectionTableMapper";
import { ApplicationDataProduction } from "../domain/ApplicationData/ApplicationDataProduction";
import { ConnectionRepository } from "../repositories/connections/ConnectionRepository";
import { SqlEngine } from "../repositories/sql-engine/SqlEngine";
import { ConnectionService } from "../services/connections/ConnectionService";

const diApplicationData = new ApplicationDataProduction();

const diSqlEngine = new SqlEngine(diApplicationData);

const diConnectionsRepository = new ConnectionRepository(diSqlEngine);
const diConnectionTableMapper = new ConnectionTableMapper();

export const diConnectionService: ConnectionService = new ConnectionService({
    mapper: diConnectionTableMapper,
    repo: diConnectionsRepository,
});




