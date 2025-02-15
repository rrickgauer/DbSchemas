

using DbSchemas.ServiceHub.Domain.ColumnMappers;
using DbSchemas.ServiceHub.Domain.Records;
using System;

namespace DbSchemas.ServiceHub.Domain.Databases;

public class PostgresDatabase(DatabaseConnectionRecord connectionRecord) : IDatabase
{
    public DatabaseConnectionRecord DatabaseConnectionRecord => connectionRecord;

    public string ConnectionString => $"Host={DatabaseConnectionRecord.Host};Username={DatabaseConnectionRecord.Username};Database={DatabaseConnectionRecord.DatabaseName};Password={DatabaseConnectionRecord.Password};";

    public IColumnMapper ColumnMapper => new PostgresColumnMapper();
}
