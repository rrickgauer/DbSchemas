import { ColumnDefinitionDbRecord } from "../../domain/models/column-definitions/ColumnDefinitionDbRecord";
import { ColumnDefinitionModel } from "../../domain/models/column-definitions/ColumnDefinitionModel";
import { DataRow } from "../../domain/types/CustomTypes";
import { TableMapper } from "./TableMapper";


export class ColumnDefinitionTableMapper extends TableMapper<ColumnDefinitionModel>
{
    public toModel(row: DataRow): ColumnDefinitionModel
    {
        const dbRecord = row as ColumnDefinitionDbRecord;

        const result = new ColumnDefinitionModel();

        result.position = dbRecord.column_position;
        result.name = dbRecord.column_name;
        result.columnType = dbRecord.column_data_type;
        result.isNullable = dbRecord.column_is_nullable;
        result.defaultValue = dbRecord.column_default_value;
        result.extra = dbRecord.column_extra;

        return result;
    }

}
