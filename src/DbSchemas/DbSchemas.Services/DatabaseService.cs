using DbSchemas.Domain.Models;
using DbSchemas.Mappers;
using DbSchemas.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Services;

public class DatabaseService
{
    private DatabaseRepository _repo;
    private IModelMapper<Database> _mapper;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="repo"></param>
    public DatabaseService(DatabaseRepository repo)
    {
        _repo = repo;
        _mapper = new DatabaseMapper();
    }

    /// <summary>
    /// Get the database with the matching id
    /// </summary>
    /// <param name="id"></param>
    /// <returns></returns>
    public async Task<Database?> GetDatabaseAsync(long id)
    {
        var databases = await GetDatabasesAsync();

        var result = databases.Where(db => db.Id == id).FirstOrDefault();

        return result;
    }


    /// <summary>
    /// Get all the databases
    /// </summary>
    /// <returns></returns>
    public async Task<IEnumerable<Database>> GetDatabasesAsync()
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
    public async Task<bool> InsertDatabaseAsync(Database database)
    {
        var numRecords = await _repo.InsertAsync(database);

        var databases = await GetDatabasesAsync();
        var newDatabase = databases.OrderBy(database => database.Id).Last();

        database.Id = newDatabase.Id;

        return numRecords > 0;
    }


    /// <summary>
    /// Save the database
    /// </summary>
    /// <param name="database"></param>
    /// <returns></returns>
    public async Task<bool> SaveDatabaseAsync(Database database)
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
