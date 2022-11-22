using DbSchemas.Domain.ColumnMappers;
using DbSchemas.Domain.Models;
using DbSchemas.Domain.Records;
using DbSchemas.Sql.Commands;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Domain.Databases;

public class MysqlDatabase : IDatabase
{
    public DatabaseConnectionRecord DatabaseConnectionRecord { get; }

    public string ConnectionString => $"server={DatabaseConnectionRecord.Host};user={DatabaseConnectionRecord.Username};database={DatabaseConnectionRecord.DatabaseName};password={DatabaseConnectionRecord.Password}";

    public IColumnMapper ColumnMapper => new MysqlColumnMapper();

    public MysqlDatabase(DatabaseConnectionRecord databaseConnectionRecord)
    {
        DatabaseConnectionRecord = databaseConnectionRecord;
    }

    public MysqlDatabase()
    {
    }
}
