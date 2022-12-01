using DbSchemas.Domain.ColumnMappers;
using DbSchemas.Domain.Records;
using System.Data.SQLite;

namespace DbSchemas.Domain.Databases;

public class SqliteDatabase : IDatabase
{
    public DatabaseConnectionRecord DatabaseConnectionRecord { get; }
    public string ConnectionString => GetConnectionString();
    public IColumnMapper ColumnMapper => new SqliteColumnMapper();

    public SqliteDatabase(DatabaseConnectionRecord databaseConnectionRecord)
    {
        DatabaseConnectionRecord = databaseConnectionRecord;
    }

    /// <summary>
    /// https://learn.microsoft.com/en-us/dotnet/standard/data/sqlite/compare#connection-strings
    /// </summary>
    /// <returns></returns>
    private string GetConnectionString()
    {
        SQLiteConnectionStringBuilder stringBuilder = new()
        {
            DataSource = DatabaseConnectionRecord.File,
        };

        stringBuilder.Add("FailIfMissing", "True");

        return stringBuilder.ConnectionString;
    }
}
