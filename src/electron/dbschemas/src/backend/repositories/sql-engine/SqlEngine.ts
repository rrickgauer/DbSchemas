import Database, { Database as DbConnection } from 'better-sqlite3';
import { DataRow, ParameterBindings } from '../../../shared/domain/types/types';



const EMPTY_PARMS = {} as ParameterBindings;

export class SqlEngine
{
    private readonly _dbFile = 'C:\\Users\\Ryan.Rickgauer\\AppData\\Local\\DbSchemas\\DbSchemas-Data.db';

    public select(sql: string): DataRow | null;
    public select(sql: string, parms: ParameterBindings): DataRow | null;
    public select(sql: string, parms?: ParameterBindings): DataRow | null
    {
        const rows = this.selectAll(sql, parms ?? EMPTY_PARMS);

        if (rows.length === 0)
        {
            return null;
        }

        return rows[0];
    }


    /**
     * Run a select query that returns multiple rows
     */
    public selectAll(sql: string): DataRow[];
    public selectAll(sql: string, parms: ParameterBindings): DataRow[];
    public selectAll(sql: string, parms?: ParameterBindings): DataRow[]
    {
        const connection = this.getDbConnection();
        const stmt = connection.prepare(sql);

        if (!parms)
        {
            parms = EMPTY_PARMS;
        }

        const result = stmt.all(parms);
        
        return result as DataRow[];
    }


    private getDbConnection(): DbConnection
    {
        const db = new Database(this._dbFile, {
            fileMustExist: true,
        });

        db.pragma('foreign_keys = ON');
        db.pragma('journal_mode = WAL');
        db.pragma('synchronous = NORMAL');
        db.pragma('recursive_triggers = ON');
        db.pragma('strict = ON');
        db.pragma('compile_options = ENABLE_JSON1');

        return db;
    }


}
