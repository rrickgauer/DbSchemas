using DbSchemas.Configurations;
using DbSchemas.Domain.Models;
using DbSchemas.Repository.Misc;
using DbSchemas.Sql.Commands;
using Microsoft.Data.Sqlite;
using System.Data;

namespace DbSchemas.Repository;

public class DatabaseConnectionRecordRepository
{
    private IConfigs _configs;
    private RepoConnection _connection;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="configs"></param>
    public DatabaseConnectionRecordRepository(IConfigs configs)
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
        SqliteCommand command = new(DatabaseRecordRepositorySql.SelectAll);

        DataTable table = await _connection.FetchAllAsync(command);

        return table;
    }

    /// <summary>
    /// Insert a new record into the database table
    /// </summary>
    /// <param name="database"></param>
    /// <returns></returns>
    public async Task<int> InsertAsync(DatabaseConnectionRecord database)
    {
        SqliteCommand command = new(DatabaseRecordRepositorySql.Insert);

        SetModifyCommandParms(command, database);

        var numRecords = await _connection.ModifyAsync(command);

        return numRecords;
    }

    /// <summary>
    /// Update the given database record in the table
    /// </summary>
    /// <param name="database"></param>
    /// <returns></returns>
    public async Task<int> UpdateAsync(DatabaseConnectionRecord database)
    {
        SqliteCommand command = new(DatabaseRecordRepositorySql.Insert);

        SetModifyCommandParms(command, database);

        command.Parameters.AddWithValue("@id", database.Id);

        var numRecords = await _connection.ModifyAsync(command);

        return numRecords;
    }

    /// <summary>
    /// Setup the modify command parms
    /// </summary>
    /// <param name="command"></param>
    /// <param name="database"></param>
    private static void SetModifyCommandParms(SqliteCommand command, DatabaseConnectionRecord database)
    {
        command.Parameters.AddWithValue("@name", database.Name);
        command.Parameters.AddWithValue("@database_type_id", (long)database.DatabaseType);
        command.Parameters.AddWithValue("@database_name", string.IsNullOrEmpty(database.DatabaseName) ? DBNull.Value : database.DatabaseName);
        command.Parameters.AddWithValue("@username", string.IsNullOrEmpty(database.Username) ? DBNull.Value : database.Username);
        command.Parameters.AddWithValue("@host", string.IsNullOrEmpty(database.Host) ? DBNull.Value : database.Host);
        command.Parameters.AddWithValue("@password", string.IsNullOrEmpty(database.Password) ? DBNull.Value : database.Password);
        command.Parameters.AddWithValue("@file", string.IsNullOrEmpty(database.File) ? DBNull.Value : database.File);
    }

    /// <summary>
    /// Delete the record
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public async Task<int> DeleteAsync(long id)
    {
        SqliteCommand command = new(DatabaseRecordRepositorySql.Delete);

        command.Parameters.AddWithValue("@id", id);

        var numRecords = await _connection.ModifyAsync(command);

        return numRecords;
    }


}
