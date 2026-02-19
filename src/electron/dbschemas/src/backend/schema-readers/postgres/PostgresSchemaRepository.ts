import { Pool, QueryResult } from 'pg';
import { GetConnectionTableNameDataRow } from '../../../shared/domain/models/table-definitions/GetConnectionTableNameDataRow';
import { ColumnDefinitionDbRecord } from '../../../shared/domain/models/column-definitions/ColumnDefinitionDbRecord';

type PostgresSchemaRepositoryArgs = {
  user?: string | null;
  password?: string | null;
  host?: string | null;
  port?: number | null;
  databaseName?: string | null;
}

const NULL_POOL_VALUE = undefined;

export class PostgresSchemaRepository
{
    private readonly _user: string | null;
    private readonly _password: string | null;
    private readonly _host: string | null;
    private readonly _port: number | null;
    private readonly _databaseName: string | null;

    constructor(args: PostgresSchemaRepositoryArgs)
    {
        this._user = args.user ?? null;
        this._password = args.password ?? null;
        this._host = args.host ?? null;
        this._port = args.port ?? null;
        this._databaseName = args.databaseName ?? null;
    }


    public async getTableNames(): Promise<GetConnectionTableNameDataRow[]>
    {
        const sql = getTableNamesSql();
        const table = await this.executeSql(sql);

        return table.rows as GetConnectionTableNameDataRow[];
    }


    public async getTableColumns(tableName: string): Promise<ColumnDefinitionDbRecord[]>
    {
        const sql = getTableColumnsSql();
        const parms = [tableName];

        const table = await this.executeSql(sql, parms);

        return table.rows;
    }

    

    private async executeSql(sql: string): Promise<QueryResult<any>>;
    private async executeSql(sql: string, parms: any[] | null): Promise<QueryResult<any>>;
    private async executeSql(sql: string, parms?: any[] | null): Promise<QueryResult<any>>
    {
        const connectionPool = this.getConnectionPool();
        return await connectionPool.query(sql, parms ?? NULL_POOL_VALUE);
    }

    private getConnectionPool(): Pool
    {
        return new Pool({   
            user: this._user ?? NULL_POOL_VALUE,
            password: this._password ?? NULL_POOL_VALUE,
            host: this._host ?? NULL_POOL_VALUE,
            port: this._port ?? NULL_POOL_VALUE,
            database: this._databaseName ?? NULL_POOL_VALUE,
        });
    }
}


function getTableNamesSql(): string
{
    let sql = 
    `
    SELECT distinct
        c.table_name::text as table_name
    FROM
        information_schema.columns c
    WHERE
        c.table_schema = 'public'
    ORDER BY
        table_name ASC;
    `;
    return sql;
}


function getTableColumnsSql(): string
{
    let sql = 
    `
    SELECT
        c.table_name::text as table_name,
        c.ordinal_position::int as column_position,
        c.column_name::text as column_name,
        concat_ws(' ', c.data_type, c.character_maximum_length)::text as column_data_type,
        c.is_nullable::boolean as column_is_nullable,
        c.column_default::text as column_default_value
    FROM
        information_schema.columns c
    WHERE
        c.table_schema = 'public'
        and c.table_name = $1
    ORDER BY
        c.table_name ASC,
        c.ordinal_position ASC;
    `;

    return sql;
}


