using DbSchemas.Domain.Databases;
using DbSchemas.Domain.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.OleDb;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Dumpers;

public class AccessDumper : IDumper
{
    public IDatabase DataBase { get; }

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="database"></param>
    public AccessDumper(IDatabase database)
    {
        DataBase = database;
    }

    public async Task<DatabaseDump> DumpDatabaseAsync()
    {
        // get the table names
        using OleDbConnection connection = await GetOpenConnectionAsync();
        var tableNames = await GetTableNamesAsync(connection);

        // get the schema for each table
        List<TableSchema> schemas = new();

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
    private async Task<IEnumerable<string>> GetTableNamesAsync(OleDbConnection connection)
    {
        var restrictions = new string[4];
        restrictions[3] = "TABLE";
        DataTable data = await connection.GetSchemaAsync("Tables", restrictions);

        var tables = data.AsEnumerable().Select(r => r.Field<string>("TABLE_NAME"));

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
    private async Task<DataTable> GetColumnsDataTable(OleDbConnection connection, string tableName)
    {
        using OleDbCommand cmd = new(tableName, connection);
        cmd.CommandType = CommandType.TableDirect;

        using OleDbDataReader reader = cmd.ExecuteReader(CommandBehavior.SchemaOnly);
        DataTable schemaTable = reader.GetSchemaTable();

        await reader.CloseAsync();

        schemaTable.TableName = tableName;

        return schemaTable;
    }
}
