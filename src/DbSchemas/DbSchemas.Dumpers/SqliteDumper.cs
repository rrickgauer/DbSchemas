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

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="database"></param>
    public SqliteDumper(IDatabase database)
    {
        DataBase = database;
    }

    /// <summary>
    /// Get all the table schemas 
    /// </summary>
    /// <returns></returns>
    public async Task<IEnumerable<TableSchema>> DumpDatabaseAsync()
    {
        using DataTable dataTable = await GetColumnsDataTable();

        Dictionary<string, TableSchema> tableSchemas = new();

        foreach (var row in dataTable.AsEnumerable())
        {
            // get the table that the current row belongs to
            var tableName = row.Field<string>("table_name");
            
            // add a new table schema if it doesn't already exist
            tableSchemas.TryAdd(tableName, new(tableName));

            // map out the datarow to a ColumnDefintion and add it to the collection
            ColumnDefinition mappedColumn = DataBase.ColumnMapper.ToColumnDefinition(row);
            tableSchemas[tableName].Columns.Add(mappedColumn);
        }

        return tableSchemas.Values;
    }

    /// <summary>
    /// Get a datatable of all the columns in the database (each table)
    /// </summary>
    /// <returns></returns>
    private async Task<DataTable> GetColumnsDataTable()
    {
        using SqliteConnection connection = new(_connectionString);
        using SqliteCommand command = new(SqliteDatabaseCommands.SelectAllColumns, connection);
        
        DataTable dataTable = await DumperUtilities.ExecuteQueryAsync(command);

        return dataTable;
    }

}
