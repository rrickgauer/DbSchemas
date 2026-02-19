
import { ConnectionTableMapper } from "../../shared/mappers/table-mappers/ConnectionTableMapper";
import { ApplicationDataProduction } from "../domain/ApplicationData/ApplicationDataProduction";
import { IApplicationData } from "../domain/ApplicationData/IApplicationData";
import { ConnectionRepository } from "../repositories/connections/ConnectionRepository";
import { SqlEngine } from "../repositories/SqlEngine/SqlEngine";
import { ConnectionService } from "../services/connections/ConnectionService";
import { IConnectionService } from "../services/connections/IConnectionService";
import { ISchemaReaderService } from "../services/schmea-readers/ISchemaReaderService";
import { SchemaReaderService } from "../services/schmea-readers/SchemaReaderService";

const diApplicationData: IApplicationData = new ApplicationDataProduction();

const diSqlEngine = new SqlEngine(diApplicationData);

const diConnectionsRepository = new ConnectionRepository(diSqlEngine);
const diConnectionTableMapper = new ConnectionTableMapper();
export const diConnectionService: IConnectionService = new ConnectionService({
    mapper: diConnectionTableMapper,
    repo: diConnectionsRepository,
});



export const diSchemaReaderService: ISchemaReaderService = new SchemaReaderService({

});



