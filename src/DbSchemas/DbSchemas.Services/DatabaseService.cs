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
}
