using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Domain.Databases;

public static class DumperUtilities
{
    public static async Task<DataTable> ExecuteQueryAsync(DbCommand command)
    {
        DataTable dataTable = new();

        if (command.Connection.State != ConnectionState.Open)
        {
            await command.Connection.OpenAsync();
        }

        using DbDataReader reader = await command.ExecuteReaderAsync();
        dataTable.Load(reader);

        return dataTable;
    }
}
