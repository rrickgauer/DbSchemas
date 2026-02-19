import { ColumnDefinitionModel } from "../../../shared/domain/models/column-definitions/ColumnDefinitionModel";
import { ConnectionModel } from "../../../shared/domain/models/connections/ConnectionModel";
import { ServiceResponse } from "../../../shared/domain/ServiceResponses/ServiceResponse";


export interface ISchemaReaderService
{
    getAllTableNames(connection: ConnectionModel): Promise<ServiceResponse<string[]>>;
    getTableColumns(connection: ConnectionModel, tableName: string): Promise<ServiceResponse<ColumnDefinitionModel[]>>;
}

