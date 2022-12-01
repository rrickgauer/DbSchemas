using DbSchemas.Domain.Databases;
using DbSchemas.Domain.Models;
using DbSchemas.Sql.Commands;
using System.Data;
using System.Data.SQLite;

namespace DbSchemas.Dumpers;

public class SqliteDumper : IDumper
{
    public IDatabase DataBase { get; }

    private string _connectionString => DataBase.ConnectionString;
    private const string TABLE_NAME_COLUMN = "table_name";

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
    public async Task<DatabaseDump> DumpDatabaseAsync()
    {
        using DataTable dataTable = await GetColumnsDataTable();

        Dictionary<string, TableSchema> tableSchemas = new();

        foreach (var row in dataTable.AsEnumerable())
        {
            DumperUtilities.AddDataRowToDict(row, tableSchemas, DataBase.ColumnMapper, TABLE_NAME_COLUMN);
        }

        DatabaseDump result = new() 
        { 
            TableSchemas = tableSchemas.Values, 
        };

        return result;
    }

    /// <summary>
    /// Get a datatable of all the columns in the database (each table)
    /// </summary>
    /// <returns></returns>
    private async Task<DataTable> GetColumnsDataTable()
    {
        using SQLiteConnection connection = new(_connectionString);

        using SQLiteCommand command = new(SqliteDatabaseCommands.SelectAllColumns, connection);

        DataTable dataTable = await DumperUtilities.ExecuteQueryAsync(command);

        return dataTable;
    }

}
