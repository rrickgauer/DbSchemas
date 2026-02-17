
import { EMPTY_STRING } from "../../constants/StringConstants";
import { ColumnDefinitionModel } from "../column-definitions/ColumnDefinitionModel";


export class TableDefinitionModel
{
    public connectionId: number = -1;
    public tableName: string = EMPTY_STRING;
    public columns: ColumnDefinitionModel[] = [];
}


