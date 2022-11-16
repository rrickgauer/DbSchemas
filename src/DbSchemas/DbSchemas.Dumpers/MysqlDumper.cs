using DbSchemas.Domain.Databases;
using DbSchemas.Domain.Models;
using DbSchemas.Sql.Commands;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Dumpers;

public class MysqlDumper : IDumper
{
    public IDatabase DataBase { get; }
    private string _connectionString => DataBase.ConnectionString;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="dataBase"></param>
    public MysqlDumper(IDatabase dataBase)
    {
        DataBase = dataBase;
    }

    /// <summary>
    /// Dump the database
    /// </summary>
    /// <returns></returns>
    public async Task<IEnumerable<TableSchema>> DumpDatabaseAsync()
    {
        using DataTable dataTable = await GetColumnsDataTable();

        Dictionary<string, TableSchema> tableSchemas = new();

        foreach (var row in dataTable.AsEnumerable())
        {
            DumperUtilities.AddDataRowToDict(row, tableSchemas, DataBase.ColumnMapper, "table_name");
        }

        return tableSchemas.Values;
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
