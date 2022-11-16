using DbSchemas.Domain.Databases;
using DbSchemas.Domain.Enums;
using DbSchemas.Domain.Models;
using DbSchemas.Dumpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Services;

public class DumpService
{

    public async Task<IEnumerable<TableSchema>> DumpDatabase(IDatabase database)
    {
        IDumper dumper = GetDumper(database);

        var result = await dumper.DumpDatabaseAsync();

        return result;
    }

    public IDumper GetDumper(IDatabase database)
    {
        IDumper dumper = null;

        if (database.DatabaseConnectionRecord.DatabaseType == DatabaseType.SQLite)
            dumper = new SqliteDumper(database);

        return dumper;
    }
}
