import { ColumnDefinitionApiResponse } from "../../../shared/domain/models/column-definitions/ColumnDefinitionApiResponse";
import { TableColumnsRequestData } from "../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { TableDefinitionModel } from "../../../shared/domain/models/table-definitions/TableDefinitionModel";
import { ServiceResponse } from "../../../shared/domain/ServiceResponses/ServiceResponse";
import { ColumnDefinitionModelApiResponseMapper } from "../../../shared/mappers/basic-mappers/column-definitions/ColumnDefinitionModelApiResponseMapper";
import { ApiTables } from "../api/ApiTables";
import { toServiceResponse } from "../utilities/ApiResponseHandlers";


export class TableServiceGui
{
    public async getConnectionTables(connectionId: number): Promise<ServiceResponse<string[]>>
    {
        const api = new ApiTables(connectionId);
        const apiResponse = await api.get();
        return await toServiceResponse<string[]>(apiResponse);
    }

    public async getTableColumns(data: TableColumnsRequestData): Promise<ServiceResponse<TableDefinitionModel>>
    {
        const api = new ApiTables(data.connectionId);
        const response = await api.get(data.tableName);
        const apiResponse = await toServiceResponse<ColumnDefinitionApiResponse[]>(response);
        
        if(apiResponse.hasError() || apiResponse.data == null)
        {
            return new ServiceResponse({
                errorMessage: apiResponse.errorMessage,
            });
        }
        
        const tableDefinition = new TableDefinitionModel();
        tableDefinition.connectionId = data.connectionId;
        tableDefinition.tableName = data.tableName;
        
        const mapper = new ColumnDefinitionModelApiResponseMapper();
        tableDefinition.columns = mapper.map(apiResponse.data);
        
        return new ServiceResponse({
            data: tableDefinition,
        });
    }
}
