import { ColumnDefinitionModel } from "../../../shared/domain/models/column-definitions/ColumnDefinitionModel";
import { ConnectionModel } from "../../../shared/domain/models/connections/ConnectionModel";
import { ServiceResponse } from "../../../shared/domain/ServiceResponses/ServiceResponse";
import { isNull } from "../../../shared/utilities/NullableUtility";
import { ISchemaReader } from "../ISchemaReader";
import { osDoesFileExist } from "../../utilities/OperatingSystem";
import { SqliteSchemaReaderRepository } from "./SqliteSchemaReaderRepository";
import { ColumnDefinitionTableMapper } from "../../../shared/mappers/table-mappers/ColumnDefinitionTableMapper";

type SchemaReaderSqliteArgs = {
    connection: ConnectionModel;
};

const ERROR_MESSAGE_NO_FILE = `No file has been set`;
const ERROR_MESSAGE_FILE_MISSING = `The file does not exist`;

export class SchemaReaderSqlite implements ISchemaReader
{
    private readonly _connection: ConnectionModel;
    private _columnDefinitionMapper: ColumnDefinitionTableMapper;

    constructor(args: SchemaReaderSqliteArgs)
    {
        this._connection = args.connection;
        this._columnDefinitionMapper = new ColumnDefinitionTableMapper();
    }
    public async getTableColumns(tableName: string): Promise<ServiceResponse<ColumnDefinitionModel[]>>
    {
        const validateFileErrorMessage = await this.validateFile();
        if (validateFileErrorMessage)
        {
            return new ServiceResponse({ errorMessage: validateFileErrorMessage });
        }

        const repo = new SqliteSchemaReaderRepository({
            file: this._connection.file!,
        });

        const dataTable = await repo.selectTableColumns(tableName);
        const columnDefinitions = this._columnDefinitionMapper.toModels(dataTable);

        return new ServiceResponse({
            data: columnDefinitions,
        });
    }

    public async getAllTableNames(): Promise<ServiceResponse<string[]>>
    {
        const validateFileErrorMessage = await this.validateFile();
        if (validateFileErrorMessage)
        {
            return new ServiceResponse({ errorMessage: validateFileErrorMessage });
        }

        const repo = new SqliteSchemaReaderRepository({
            file: this._connection.file!,
        });

        const dataTable = await repo.selectTableNames();

        const tableNames = dataTable.map(row => row['table_name'] as string);

        return new ServiceResponse({
            data: tableNames,
        });
    }


    private async validateFile(): Promise<string | null>
    {
        const file = this._connection.file;
        if (isNull(file))
        {
            return ERROR_MESSAGE_NO_FILE;
        }

        const doesFileExist = await osDoesFileExist(file);

        if (!doesFileExist)
        {
            return ERROR_MESSAGE_FILE_MISSING;
        }

        return null;
    }
}




