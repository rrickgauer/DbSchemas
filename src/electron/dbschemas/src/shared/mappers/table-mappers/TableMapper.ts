import { DataRow, DataTable } from "../../domain/types/CustomTypes";




export abstract class TableMapper<TModel>
{
    abstract toModel(row: DataRow): TModel;

    public toModels(rows: DataTable): TModel[]
    {
        return rows.map((r) => this.toModel(r));
    }
}

