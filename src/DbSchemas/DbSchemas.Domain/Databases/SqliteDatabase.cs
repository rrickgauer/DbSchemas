using DbSchemas.Domain.ColumnMappers;
using DbSchemas.Domain.Models;
using DbSchemas.Domain.Records;
using DbSchemas.Sql.Commands;
using Microsoft.Data.Sqlite;

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Domain.Databases;

public class SqliteDatabase : IDatabase
{
    public DatabaseConnectionRecord DatabaseConnectionRecord { get; }

    public string ConnectionString => $"Data Source={DatabaseConnectionRecord.File}";

    private readonly IColumnMapper _mapper = new SqliteColumnMapper();


    public SqliteDatabase(DatabaseConnectionRecord databaseConnectionRecord)
    {
        DatabaseConnectionRecord = databaseConnectionRecord;
    }

    public async Task<IEnumerable<TableSchema>> GetSchemasAsync()
    {
        var tableNames = await GetTableNamesAsync();

        var schemas = tableNames.Select(tableName => new TableSchema(tableName)).ToList();

        using SqliteConnection connection = new(ConnectionString);
        await connection.OpenAsync();

        foreach (var schema in schemas)
        {
            schema.Columns = (await DescribeTableAsync(connection, schema.TableName)).ToList();
        }

        return schemas;
    }



    /// <summary>
    /// Get a list of all the table names in the database
    /// </summary>
    /// <returns></returns>
    private async Task<IEnumerable<string>> GetTableNamesAsync()
    {
        SqliteConnection connection = new(ConnectionString);
        await connection.OpenAsync();

        SqliteCommand command = new(SqliteDatabaseCommands.SelectTables, connection);

        DataTable dataTable = await LoadDataTableAsync(command);

        var tableNames =
            from row in dataTable.AsEnumerable()
            select row.Field<string>("tbl_name");

        return tableNames;
    }

    private async Task<IEnumerable<ColumnDefinition>> DescribeTableAsync(SqliteConnection connection, string tableName)
    {
        var table = await FetchColumnMetaData(connection, tableName);
        return _mapper.ToColumnDefinitions(table);
    }


    private async Task<DataTable> FetchColumnMetaData(SqliteConnection connection, string tableName)
    {
        using SqliteCommand command = new(SqliteDatabaseCommands.DescribeTable, connection);

        command.Parameters.AddWithValue("@table_name", tableName);

        var table = await LoadDataTableAsync(command);

        return table;
    }


    private async Task<DataTable> LoadDataTableAsync(SqliteCommand command)
    {
        DataTable dataTable = new();

        using DbDataReader reader = await command.ExecuteReaderAsync();
        dataTable.Load(reader);

        return dataTable;
    }
}
