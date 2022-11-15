using DbSchemas.Configurations;
using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Repository;

public class RepoConnection
{
    public string ConnectionString => $"Data Source={_configs.DatabaseFile.FullName}";

    private readonly IConfigs _configs;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="configs"></param>
    public RepoConnection(IConfigs configs)
    {
        _configs = configs;
    }

    /// <summary>
    /// Retrieve all the data rows for the specified sql command
    /// </summary>
    /// <param name="command"></param>
    /// <returns></returns>
    public async Task<DataTable> FetchAllAsync(SqliteCommand command)
    {
        // setup a new database connection object
        using SqliteConnection connection = await GetNewOpenConnectionAsync();
        command.Connection = connection;

        // fill the datatable with the command results
        DataTable results = await LoadDataTableAsync(command);

        return results;
    }

    /// <summary>
    /// Load the output from the given sql command into a data table
    /// </summary>
    /// <param name="command"></param>
    /// <returns></returns>
    private async Task<DataTable> LoadDataTableAsync(SqliteCommand command)
    {
        DataTable dataTable = new();

        using DbDataReader reader = await command.ExecuteReaderAsync();
        dataTable.Load(reader);

        return dataTable;
    }

    /// <summary>
    /// Perform an Insert/Update/Delete sql command
    /// </summary>
    /// <param name="command"></param>
    /// <returns></returns>
    public async Task<int> ModifyAsync(SqliteCommand command)
    {
        // setup a new database connection object
        using SqliteConnection connection = await GetNewOpenConnectionAsync();
        command.Connection = connection;

        // execute the non query command
        int numRowsAffected = await command.ExecuteNonQueryAsync();

        return numRowsAffected;
    }


    /// <summary>
    /// Get a new connection using the connection string
    /// </summary>
    /// <returns></returns>
    private async Task<SqliteConnection> GetNewOpenConnectionAsync()
    {
        SqliteConnection connection = new(ConnectionString);

        await connection.OpenAsync();

        return connection;

    }
}
