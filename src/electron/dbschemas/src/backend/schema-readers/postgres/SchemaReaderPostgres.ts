import { ColumnDefinitionDbRecord } from "../../../shared/domain/models/column-definitions/ColumnDefinitionDbRecord";
import { ColumnDefinitionModel } from "../../../shared/domain/models/column-definitions/ColumnDefinitionModel";
import { ConnectionModel } from "../../../shared/domain/models/connections/ConnectionModel";
import { GetConnectionTableNameDataRow } from "../../../shared/domain/models/table-definitions/GetConnectionTableNameDataRow";
import { ServiceResponse } from "../../../shared/domain/ServiceResponses/ServiceResponse";
import { ColumnDefinitionTableMapper } from "../../../shared/mappers/table-mappers/ColumnDefinitionTableMapper";
import { ISchemaReader } from "../ISchemaReader";
import { PostgresSchemaRepository } from "./PostgresSchemaRepository";

type SchemaReaderPostgresArgs = {
    connection: ConnectionModel;
};

const REPO_ERROR_MESSAGE = `Postgres Schema Reader Error`;

export class SchemaReaderPostgres implements ISchemaReader
{
    private readonly _connection: ConnectionModel;
    private _columnDefinitionMapper: ColumnDefinitionTableMapper;

    constructor (args: SchemaReaderPostgresArgs)
    {
        this._connection = args.connection;
        this._columnDefinitionMapper = new ColumnDefinitionTableMapper();
    }

    public async getTableColumns(tableName: string): Promise<ServiceResponse<ColumnDefinitionModel[]>>
    {
        const repo = this.getNewRepository();

        let repoResult: ColumnDefinitionDbRecord[];

        try
        {
            repoResult = await repo.getTableColumns(tableName);
        }
        catch (error)
        {
            console.error(error);
            return new ServiceResponse({errorMessage: REPO_ERROR_MESSAGE});
        }

        const models = this._columnDefinitionMapper.toModels(repoResult);

        return new ServiceResponse({
            data: models,
        });
    }

    public async getAllTableNames(): Promise<ServiceResponse<string[]>>
    {
        const repo = this.getNewRepository();
        let repoResult: GetConnectionTableNameDataRow[] | null = null;

        try
        {
            repoResult = await repo.getTableNames();
        }
        catch (error)
        {
            console.error(error);

            return new ServiceResponse({
                errorMessage: REPO_ERROR_MESSAGE,
            });
        }

        const tableNames = repoResult.map((row) => row.table_name);

        return new ServiceResponse({
            data: tableNames,
        });
    }

    private getNewRepository(): PostgresSchemaRepository
    {
        return new PostgresSchemaRepository({
            databaseName: this._connection.databaseName,
            host: this._connection.host,
            password: this._connection.password,
            user: this._connection.username,
        });
    }
}

