using DbSchemas.Domain.Models;
using DbSchemas.Domain.Records;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Domain.Databases;

public class MysqlDatabase : IDatabase
{
    public DatabaseConnectionRecord DatabaseConnectionRecord { get; }

    public string ConnectionString => $"server={DatabaseConnectionRecord.Host};user={DatabaseConnectionRecord.Username};database={DatabaseConnectionRecord.DatabaseName};password={DatabaseConnectionRecord.Password}";

    public MysqlDatabase(DatabaseConnectionRecord databaseConnectionRecord)
    {
        DatabaseConnectionRecord = databaseConnectionRecord;
    }

    public async Task<IEnumerable<TableSchema>> GetSchemasAsync()
    {
        return new List<TableSchema>();
    }
}
