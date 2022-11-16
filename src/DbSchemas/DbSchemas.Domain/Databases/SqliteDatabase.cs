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
    public IColumnMapper ColumnMapper { get; } = new SqliteColumnMapper();

    public SqliteDatabase(DatabaseConnectionRecord databaseConnectionRecord)
    {
        DatabaseConnectionRecord = databaseConnectionRecord;
    }

    /// <summary>
    /// Get a list of all the table names in the database
    /// </summary>
    /// <returns></returns>
    public async Task<IEnumerable<string>> GetTableNamesAsync()
    {
        using SqliteConnection connection = await GetConnectionAsync();
        using SqliteCommand command = new(SqliteDatabaseCommands.SelectTables, connection);
        using DataTable dataTable = await ExecuteQueryAsync(command);

        var tableNames = from row in dataTable.AsEnumerable() select row.Field<string>("tbl_name");

        await connection.CloseAsync();

        return tableNames;
    }

    public async Task<DataTable> GetTableColumnsAsync(string tableName)
    {
        SqliteConnection connection = await GetConnectionAsync();

        using SqliteCommand command = new(SqliteDatabaseCommands.DescribeTable, connection);
        command.Parameters.AddWithValue("@table_name", tableName);

        var table = await ExecuteQueryAsync(command);

        await connection.CloseAsync();

        return table;
    }

    private async Task<DataTable> ExecuteQueryAsync(SqliteCommand command)
    {
        DataTable dataTable = new();

        using DbDataReader reader = await command.ExecuteReaderAsync();
        dataTable.Load(reader);

        return dataTable;
    }

    private async Task<SqliteConnection> GetConnectionAsync()
    {
        SqliteConnection connection = new(ConnectionString);
        await connection.OpenAsync();

        return connection;
    }


}
