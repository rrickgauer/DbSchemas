using DbSchemas.Domain.ColumnMappers;
using DbSchemas.Domain.Models;
using DbSchemas.Domain.Records;
using DbSchemas.Sql.Commands;
using Microsoft.Data.Sqlite;

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Domain.Databases;

public class SqliteDatabase : IDatabase
{
    public DatabaseConnectionRecord DatabaseConnectionRecord { get; }
    public string ConnectionString => $"Data Source={DatabaseConnectionRecord.File}";
    public IColumnMapper ColumnMapper => new SqliteColumnMapper();

    public SqliteDatabase(DatabaseConnectionRecord databaseConnectionRecord)
    {
        DatabaseConnectionRecord = databaseConnectionRecord;
    }
}
