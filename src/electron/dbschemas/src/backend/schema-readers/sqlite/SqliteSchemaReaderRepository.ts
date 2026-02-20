import Database from "better-sqlite3";
import { DataRow, DataTable } from "../../../shared/domain/types/CustomTypes";


type SqliteSchemaReaderRepositoryArgs = {
    file: string;
};

export class SqliteSchemaReaderRepository
{
    private _file: string;

    constructor(args: SqliteSchemaReaderRepositoryArgs)
    {
        this._file = args.file;
    }

    public async selectTableNames(): Promise<DataTable>
    {
        const connection = new Database(this._file, {
            fileMustExist: true,
        });

        const stmt = connection.prepare(SELECT_TABLE_NAMES);
        const result = stmt.all();

        return result as DataTable;
    }

    public async selectTableColumns(tableName: string): Promise<DataTable>
    {
        const connection = new Database(this._file, {
            fileMustExist: true,
        });

        const stmt = connection.prepare(SELECT_TABLE_COLUMNS);
        const result = stmt.all({
            table_name: tableName,
        });

        return result as DataTable;
    }
}


const SELECT_TABLE_NAMES = `
SELECT
    DISTINCT name as table_name
FROM
    sqlite_master
WHERE
    type IN ('table', 'view')
ORDER BY
    name asc;
`;

const SELECT_TABLE_COLUMNS = `
WITH all_tables AS (
    SELECT
        name
    FROM
        sqlite_master
    WHERE
        type IN ('table', 'view')
)
SELECT
    all_tables.name AS table_name,
    pti.cid AS column_position,
    pti.name AS column_name,
    pti.type AS column_data_type,
    IIF(pti.[notnull], 'false', 'true') AS column_is_nullable,
    pti.dflt_value AS column_default_value
FROM
    all_tables
    INNER JOIN pragma_table_info(all_tables.name) pti
WHERE
    all_tables.name = @table_name
ORDER BY
    column_position asc;
`;
