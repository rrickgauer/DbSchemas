import { ConnectionType } from "../../../shared/domain/enums/ConnectionType";
import { ArgumentException } from "../../../shared/domain/errors/ArgumentException";
import { NotImplementedException } from "../../../shared/domain/errors/NotImplementedException";
import { ColumnDefinitionModel } from "../../../shared/domain/models/column-definitions/ColumnDefinitionModel";
import { ConnectionModel } from "../../../shared/domain/models/connections/ConnectionModel";
import { ServiceResponse } from "../../../shared/domain/ServiceResponses/ServiceResponse";
import { ISchemaReader } from "../../schema-readers/ISchemaReader";
import { SchemaReaderPostgres } from "../../schema-readers/postgres/SchemaReaderPostgres";
import { ISchemaReaderService } from "./ISchemaReaderService";

type SchemaReaderServiceArgs = {

}

export class SchemaReaderService implements ISchemaReaderService
{
    private readonly _args: SchemaReaderServiceArgs;

    constructor(args: SchemaReaderServiceArgs)
    {
        this._args = args;
    }

    public async getTableColumns(connection: ConnectionModel, tableName: string): Promise<ServiceResponse<ColumnDefinitionModel[]>>
    {
        switch(connection.connectionType)
        {
            case ConnectionType.Postgres:
                return await this.getTableColumnsPostgres(connection, tableName);
        }

        throw new NotImplementedException();
    }

    public async getAllTableNames(connection: ConnectionModel): Promise<ServiceResponse<string[]>>
    {
        switch(connection.connectionType)
        {
            case ConnectionType.Postgres:
                return await this.getTableNamesPostgres(connection);
        }

        throw new NotImplementedException();
    }

    //#region - Postgres -
    private async getTableNamesPostgres(connection: ConnectionModel): Promise<ServiceResponse<string[]>>
    {
        if (connection.connectionType != ConnectionType.Postgres)
        {
            throw new ArgumentException(`Connection type not postgres!`);
        }

        const schemaReader: ISchemaReader = new SchemaReaderPostgres({
            connection: connection,
        });

        return await schemaReader.getAllTableNames();
    }

    private async getTableColumnsPostgres(connection: ConnectionModel, tableName: string): Promise<ServiceResponse<ColumnDefinitionModel[]>>
    {
        if (connection.connectionType != ConnectionType.Postgres)
        {
            throw new ArgumentException(`Connection type not postgres!`);
        }

        const schemaReader: ISchemaReader = new SchemaReaderPostgres({
            connection: connection,
        });

        return await schemaReader.getTableColumns(tableName);
    }
    //#endregion

}
