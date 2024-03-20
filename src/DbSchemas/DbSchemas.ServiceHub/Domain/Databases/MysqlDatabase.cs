

using DbSchemas.ServiceHub.Domain.ColumnMappers;
using DbSchemas.ServiceHub.Domain.Records;

namespace DbSchemas.ServiceHub.Domain.Databases;

public class MysqlDatabase(DatabaseConnectionRecord databaseConnectionRecord) : IDatabase
{
    public DatabaseConnectionRecord DatabaseConnectionRecord { get; } = databaseConnectionRecord;

    public string ConnectionString => $"server={DatabaseConnectionRecord.Host};user={DatabaseConnectionRecord.Username};database={DatabaseConnectionRecord.DatabaseName};password={DatabaseConnectionRecord.Password}";

    public IColumnMapper ColumnMapper => new MysqlColumnMapper();
}
