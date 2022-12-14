using DbSchemas.Domain.Databases;
using DbSchemas.Domain.Enums;
using DbSchemas.Domain.Models;
using DbSchemas.Dumpers;

namespace DbSchemas.Services;

public class DumpService
{
    /// <summary>
    /// Dump the specified database
    /// </summary>
    /// <param name="database"></param>
    /// <returns></returns>
    public async Task<DatabaseDump> DumpDatabase(IDatabase database)
    {
        IDumper? dumper = GetDumper(database);

        if (dumper is null)
            throw new Exception("Could not find an appropriate dumper for the database.");

        var result = await dumper.DumpDatabaseAsync();

        return result;
    }

    /// <summary>
    /// Get the appropriate dumper class for the given database
    /// </summary>
    /// <param name="database"></param>
    /// <returns></returns>
    public IDumper? GetDumper(IDatabase database)
    {
        IDumper? dumper = database.DatabaseConnectionRecord.DatabaseType switch
        {
            DatabaseType.SQLite => new SqliteDumper(database),
            DatabaseType.MySql => new MysqlDumper(database),
            DatabaseType.Access => new AccessDumper(database),
            _ => null,
        };

        return dumper;
    }
}
