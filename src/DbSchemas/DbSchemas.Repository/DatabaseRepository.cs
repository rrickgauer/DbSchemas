using DbSchemas.Configurations;
using DbSchemas.Domain.Models;
using DbSchemas.Sql.Commands;
using Microsoft.Data.Sqlite;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Repository;

public class DatabaseRepository
{
    private IConfigs _configs;
    private RepoConnection _connection;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="configs"></param>
    public DatabaseRepository(IConfigs configs)
    {
        _configs = configs;
        _connection = new(_configs);
    }

    /// <summary>
    /// Select all database records.
    /// </summary>
    /// <returns>All database records.</returns>
    public async Task<DataTable> SelectAllAsync()
    {
        SqliteCommand command = new(DatabaseRepositorySql.SelectAll);

        DataTable table = await _connection.FetchAllAsync(command);

        return table;
    }


    public async Task<int> InsertAsync(Database database)
    {
        SqliteCommand command = new(DatabaseRepositorySql.Insert);

        command.Parameters.AddWithValue("@name", database.Name);
        command.Parameters.AddWithValue("@database_type_id", (long)database.DatabaseType);
        command.Parameters.AddWithValue("@database_name", string.IsNullOrEmpty(database.DatabaseName) ? DBNull.Value : database.DatabaseName);
        command.Parameters.AddWithValue("@username", string.IsNullOrEmpty(database.Username) ? DBNull.Value : database.Username);
        command.Parameters.AddWithValue("@host", string.IsNullOrEmpty(database.Host) ? DBNull.Value : database.Host);
        command.Parameters.AddWithValue("@password", string.IsNullOrEmpty(database.Password) ? DBNull.Value : database.Password);
        command.Parameters.AddWithValue("@file", string.IsNullOrEmpty(database.File) ? DBNull.Value : database.File);

        var numRecords = await _connection.ModifyAsync(command);

        return numRecords;
    }


    

    
}
