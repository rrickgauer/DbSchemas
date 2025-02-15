using DbSchemas.ServiceHub.Domain.Databases;
using DbSchemas.ServiceHub.Domain.Models;
using DbSchemas.ServiceHub.Sql.Commands;
using MySql.Data.MySqlClient;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Dumpers;

public class PostgresDumper : IDumper
{
    public IDatabase DataBase { get; }
    private string _connectionString => DataBase.ConnectionString;

    public PostgresDumper(IDatabase database)
    {
        DataBase = database;
    }

    public async Task<DatabaseDump> DumpDatabaseAsync()
    {
        using DataTable dataTable = await GetColumnsDataTable();

        Dictionary<string, TableSchema> tableSchemas = new();

        foreach (var row in dataTable.AsEnumerable())
        {
            DumperUtilities.AddDataRowToDict(row, tableSchemas, DataBase.ColumnMapper, "table_name");
        }

        DatabaseDump databaseDump = new()
        {
            TableSchemas = tableSchemas.Values.OrderBy(o => o.TableName.ToLower()).ToList(),
        };

        return databaseDump;
    }


    private async Task<DataTable> GetColumnsDataTable()
    {

        var ss = _connectionString;

        var sa = 1;

        await using var datasource = NpgsqlDataSource.Create(_connectionString);
        await using var connection = datasource.OpenConnection();

        await using var command = new NpgsqlCommand(PostgresCommands.SelectAllColumns, connection)
        {
            //Parameters =
            //{
            //    new() { Value = DataBase.DatabaseConnectionRecord.DatabaseName }
            //},
        };

        return await DumperUtilities.ExecuteQueryAsync(command);
    }
}
