﻿using DbSchemas.ServiceHub.Domain.Databases;
using DbSchemas.ServiceHub.Domain.Models;
using DbSchemas.ServiceHub.Sql.Commands;
using MySql.Data.MySqlClient;
using System.Data;

namespace DbSchemas.ServiceHub.Dumpers;

/// <summary>
/// Constructor
/// </summary>
/// <param name="dataBase"></param>
public class MysqlDumper(IDatabase dataBase) : IDumper
{
    public IDatabase DataBase { get; } = dataBase;
    private string _connectionString => DataBase.ConnectionString;

    /// <summary>
    /// Dump the database
    /// </summary>
    /// <returns></returns>
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


    /// <summary>
    /// Get a datatable of all the columns in the database (each table)
    /// </summary>
    /// <returns></returns>
    private async Task<DataTable> GetColumnsDataTable()
    {
        using MySqlConnection connection = new(_connectionString);
        using MySqlCommand command = new(MysqlDatabaseCommands.SelectAllColumns, connection);

        command.Parameters.AddWithValue("@database_name", DataBase.DatabaseConnectionRecord.DatabaseName);

        DataTable dataTable = await DumperUtilities.ExecuteQueryAsync(command);

        return dataTable;
    }
}
