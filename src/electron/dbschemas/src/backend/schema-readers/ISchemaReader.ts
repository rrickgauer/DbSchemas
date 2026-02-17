import { ColumnDefinitionModel } from "../../shared/domain/models/column-definitions/ColumnDefinitionModel";
import { ServiceResponse } from "../../shared/domain/ServiceResponses/ServiceResponse";

export interface ISchemaReader
{
    getAllTableNames(): Promise<ServiceResponse<string[]>>;
    getTableColumns(tableName: string): Promise<ServiceResponse<ColumnDefinitionModel[]>>;
}