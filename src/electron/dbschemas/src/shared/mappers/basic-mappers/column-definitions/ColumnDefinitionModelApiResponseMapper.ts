import { ColumnDefinitionApiResponse } from "../../../domain/models/column-definitions/ColumnDefinitionApiResponse";
import { ColumnDefinitionModel } from "../../../domain/models/column-definitions/ColumnDefinitionModel";
import { TwoWayMapper } from "../TwoWayMapper";



export class ColumnDefinitionModelApiResponseMapper extends TwoWayMapper<ColumnDefinitionModel, ColumnDefinitionApiResponse>
{
    protected isInput(payload: any): payload is ColumnDefinitionModel
    {
        return payload instanceof ColumnDefinitionModel;
    }

    protected toOutput(payload: ColumnDefinitionModel): ColumnDefinitionApiResponse
    {
        return {
            position: payload.position,
            name: payload.name,
            columnType: payload.columnType,
            isNullable: payload.isNullable,
            defaultValue: payload.defaultValue,
            extra: payload.extra ?? null,
        };
    }
    
    protected toInput(payload: ColumnDefinitionApiResponse): ColumnDefinitionModel
    {
        const result = new ColumnDefinitionModel();

        result.position = payload.position;
        result.name = payload.name;
        result.columnType = payload.columnType;
        result.isNullable = payload.isNullable;
        result.defaultValue = payload.defaultValue;
        result.extra = payload.extra ?? null;

        return result;
    }

}
