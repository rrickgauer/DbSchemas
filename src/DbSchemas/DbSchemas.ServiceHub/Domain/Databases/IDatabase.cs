

using DbSchemas.ServiceHub.Domain.ColumnMappers;
using DbSchemas.ServiceHub.Domain.Records;

namespace DbSchemas.ServiceHub.Domain.Databases;

public interface IDatabase
{
    public DatabaseConnectionRecord DatabaseConnectionRecord { get; }
    public string ConnectionString { get; }
    public IColumnMapper ColumnMapper { get; }
}
