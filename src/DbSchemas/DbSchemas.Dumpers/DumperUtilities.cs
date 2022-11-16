using DbSchemas.Domain.ColumnMappers;
using DbSchemas.Domain.Models;
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


    public static void AddDataRowToDict(DataRow row, Dictionary<string, TableSchema> tableSchemas, IColumnMapper mapper, string tableNameColumn)
    {
        // get the table that the current row belongs to
        var tableName = row.Field<string>(tableNameColumn);

        // add a new table schema if it doesn't already exist
        tableSchemas.TryAdd(tableName, new(tableName));

        // map out the datarow to a ColumnDefintion and add it to the collection
        ColumnDefinition mappedColumn = mapper.ToColumnDefinition(row);
        tableSchemas[tableName].Columns.Add(mappedColumn);
    }
}
