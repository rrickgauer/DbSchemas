

using DbSchemas.ServiceHub.Domain.ColumnMappers;
using DbSchemas.ServiceHub.Domain.Records;
using Microsoft.Data.Sqlite;

namespace DbSchemas.ServiceHub.Domain.Databases;

public class SqliteDatabase(DatabaseConnectionRecord databaseConnectionRecord) : IDatabase
{
    public DatabaseConnectionRecord DatabaseConnectionRecord { get; } = databaseConnectionRecord;
    public string ConnectionString => GetConnectionString();
    public IColumnMapper ColumnMapper => new SqliteColumnMapper();

    /// <summary>
    /// https://learn.microsoft.com/en-us/dotnet/standard/data/sqlite/compare#connection-strings
    /// </summary>
    /// <returns></returns>
    private string GetConnectionString()
    {
        SqliteConnectionStringBuilder stringBuilder = new()
        {
            DataSource = DatabaseConnectionRecord.File,
        };

        stringBuilder.Add("FailIfMissing", "True");

        return stringBuilder.ConnectionString;
    }
}
