using DbSchemas.ServiceHub.Domain.Databases;
using DbSchemas.ServiceHub.Domain.Models;
using System.Data;
using System.Data.OleDb;

namespace DbSchemas.ServiceHub.Dumpers;

/// <summary>
/// Constructor
/// </summary>
/// <param name="database"></param>
public class AccessDumper(IDatabase database) : IDumper
{
    public IDatabase DataBase { get; } = database;

    /// <summary>
    /// Dump the database
    /// </summary>
    /// <returns></returns>
    public async Task<DatabaseDump> DumpDatabaseAsync()
    {
        // get the table names
        using OleDbConnection connection = await GetOpenConnectionAsync();
        var tableNames = await GetTableNamesAsync(connection);

        // get the schema for each table
        List<TableSchema> schemas = [];

        foreach (var tableName in tableNames)
        {
            var schema = await GetTableSchemaAsync(connection, tableName);
            schemas.Add(schema);
        }

        DatabaseDump databaseDump = new()
        {
            TableSchemas = schemas,
        };

        // close the connection
        await connection.CloseAsync();

        return databaseDump;
    }

    /// <summary>
    /// Open a new connection
    /// </summary>
    /// <returns></returns>
    private async Task<OleDbConnection> GetOpenConnectionAsync()
    {
        OleDbConnection connection = new(DataBase.ConnectionString);

        await connection.OpenAsync();

        return connection;
    }

    /// <summary>
    /// Get a list of all the table names in the database
    /// </summary>
    /// <param name="connection"></param>
    /// <returns></returns>
    private static async Task<IEnumerable<string>> GetTableNamesAsync(OleDbConnection connection)
    {
        var restrictions = new string[4];
        restrictions[3] = "TABLE";
        DataTable data = await connection.GetSchemaAsync("Tables", restrictions);

        var tables = data.AsEnumerable()
            .Select(r => r.Field<string>("TABLE_NAME"))
            .Cast<string>()
            .Where(t => !string.IsNullOrEmpty(t) && !t.StartsWith('~'));

        return tables;
    }


    /// <summary>
    /// Get the columns in the specified table
    /// </summary>
    /// <param name="connection"></param>
    /// <param name="tableName"></param>
    /// <returns></returns>
    private async Task<TableSchema> GetTableSchemaAsync(OleDbConnection connection, string tableName)
    {
        var dataTable = await GetColumnsDataTable(connection, tableName);

        var columns = DataBase.ColumnMapper.ToColumnDefinitions(dataTable).ToList();

        TableSchema schema = new(tableName, columns);

        return schema;
    }


    /// <summary>
    /// Get the columns in the specified table
    /// </summary>
    /// <param name="connection"></param>
    /// <param name="tableName"></param>
    /// <returns></returns>
    private static async Task<DataTable> GetColumnsDataTable(OleDbConnection connection, string tableName)
    {
        using OleDbCommand command = new(tableName, connection)
        {
            CommandType = CommandType.TableDirect,
        };

        using OleDbDataReader reader = command.ExecuteReader(CommandBehavior.SchemaOnly);
        DataTable schemaTable = reader.GetSchemaTable() ?? new();

        await reader.CloseAsync();

        schemaTable.TableName = tableName;

        return schemaTable;
    }
}
