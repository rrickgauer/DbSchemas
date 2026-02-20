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
