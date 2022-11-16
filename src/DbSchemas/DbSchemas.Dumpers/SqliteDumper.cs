
using DbSchemas.Domain.Databases;
using DbSchemas.Domain.Models;
using DbSchemas.Sql.Commands;
using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Dumpers;

public class SqliteDumper : IDumper
{
    public IDatabase DataBase { get; }

    private string _connectionString => DataBase.ConnectionString;

    public SqliteDumper(IDatabase database)
    {
        DataBase = database;
    }

    public async Task<IEnumerable<TableSchema>> DumpDatabaseAsync()
    {
        var tableNames = await GetTableNamesAsync();
        var schemas = tableNames.Select(t => new TableSchema(t)).ToList();

        foreach (var schema in schemas)
        {
            var columns = await GetTableColumnsAsync(schema.TableName);
            schema.Columns = DataBase.ColumnMapper.ToColumnDefinitions(columns).ToList();
        }

        return schemas;
    }

    /// <summary>
    /// Get a list of all the table names in the database
    /// </summary>
    /// <returns></returns>
    private async Task<IEnumerable<string>> GetTableNamesAsync()
    {
        using SqliteConnection connection = new(_connectionString);
        using SqliteCommand command = new(SqliteDatabaseCommands.SelectTables, connection);
        using DataTable dataTable = await DatabaseUtilities.ExecuteQueryAsync(command);

        var tableNames = from row in dataTable.AsEnumerable() select row.Field<string>("tbl_name");

        await connection.CloseAsync();

        return tableNames;
    }

    private async Task<DataTable> GetTableColumnsAsync(string tableName)
    {
        using SqliteConnection connection = new(_connectionString);
        using SqliteCommand command = new(SqliteDatabaseCommands.DescribeTable, connection);
        command.Parameters.AddWithValue("@table_name", tableName);

        var table = await DatabaseUtilities.ExecuteQueryAsync(command);

        await connection.CloseAsync();

        return table;
    }

}
