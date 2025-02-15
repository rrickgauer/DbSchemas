using DbSchemas.ServiceHub.Domain.Databases;
using DbSchemas.ServiceHub.Domain.Enums;
using DbSchemas.ServiceHub.Domain.Records;
using DbSchemas.ServiceHub.Mappers;
using DbSchemas.ServiceHub.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Services;

/// <summary>
/// Constructor
/// </summary>
/// <param name="repo"></param>
public class DatabaseConnectionRecordService(DatabaseConnectionRecordRepository repo)
{
    private readonly DatabaseConnectionRecordRepository _repo = repo;
    private readonly IModelMapper<DatabaseConnectionRecord> _mapper = new DatabaseMapper();

    public async Task<IDatabase?> GetDatabaseAsync(string connectionName)
    {
        var databases = await GetDatabasesAsync();

        var result = databases.Where(db => db.DatabaseConnectionRecord.Name == connectionName).FirstOrDefault();

        return result;
    }


    /// <summary>
    /// Get all the user's databases
    /// </summary>
    /// <returns></returns>
    public async Task<IEnumerable<IDatabase>> GetDatabasesAsync()
    {
        var databaseRecords = await GetDatabaseConnectionRecordsAsync();

        var databases = databaseRecords.Select(record => SetupDatabaseObject(record));

        return databases;
    }


    private static IDatabase SetupDatabaseObject(DatabaseConnectionRecord record)
    {
        IDatabase database = record.DatabaseType switch
        {
            DatabaseType.SQLite => new SqliteDatabase(record),
            DatabaseType.Access => new AccessDatabase(record),
            DatabaseType.Postgres => new PostgresDatabase(record),
            DatabaseType.MySql => new MysqlDatabase(record),
            _ => throw new NotImplementedException(),
        };

        return database;
    }


    /// <summary>
    /// Get all the databases
    /// </summary>
    /// <returns></returns>
    private async Task<IEnumerable<DatabaseConnectionRecord>> GetDatabaseConnectionRecordsAsync()
    {
        // fetch the database table
        var table = await _repo.SelectAllAsync();

        // map each data row to a Database model object
        var databases = _mapper.ToModels(table);

        return databases;
    }

    /// <summary>
    /// Create the database
    /// </summary>
    /// <param name="database"></param>
    /// <returns></returns>
    public async Task<bool> InsertDatabaseAsync(DatabaseConnectionRecord database)
    {
        var numRecords = await _repo.InsertAsync(database);

        var databases = await GetDatabaseConnectionRecordsAsync();
        var newDatabase = databases.OrderBy(database => database.Id).Last();

        database.Id = newDatabase.Id;

        return numRecords > 0;
    }


    /// <summary>
    /// Save the database
    /// </summary>
    /// <param name="database"></param>
    /// <returns></returns>
    public async Task<bool> SaveDatabaseAsync(DatabaseConnectionRecord database)
    {
        var numRecords = await _repo.UpdateAsync(database);

        return numRecords > 0;
    }

    /// <summary>
    /// Delete the database with the matching id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public async Task<bool> DeleteDatabaseAsync(long id)
    {
        var numRecords = await _repo.DeleteAsync(id);

        return numRecords > 0;
    }


}
