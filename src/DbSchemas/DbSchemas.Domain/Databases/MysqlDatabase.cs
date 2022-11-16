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

    public IColumnMapper ColumnMapper => throw new NotImplementedException();

    public MysqlDatabase(DatabaseConnectionRecord databaseConnectionRecord)
    {
        DatabaseConnectionRecord = databaseConnectionRecord;
    }


    public async Task<IEnumerable<string>> GetTableNamesAsync()
    {
        using MySqlConnection connection = new(ConnectionString);
        using MySqlCommand command = new(MysqlDatabaseCommands.SelectTables, connection);
        using DataTable dataTable = await DatabaseUtilities.ExecuteQueryAsync(command);

        var tableNames = dataTable.AsEnumerable().Select(row => row.Field<string>(0));

        return tableNames;
    }

    public async Task<DataTable> GetTableColumnsAsync(string tableName)
    {
        using MySqlConnection connection = new(ConnectionString);
        using MySqlCommand command = new(string.Format(MysqlDatabaseCommands.DescribeTable, tableName), connection);

        var table = await DatabaseUtilities.ExecuteQueryAsync(command);

        await connection.CloseAsync();

        return table;
    }
}
