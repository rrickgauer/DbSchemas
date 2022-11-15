using DbSchemas.Configurations;
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


    

    
}
