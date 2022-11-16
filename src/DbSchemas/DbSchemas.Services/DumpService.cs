using DbSchemas.Domain.Databases;
using DbSchemas.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Services;

public class DumpService
{
    /// <summary>
    /// Dump the specified database
    /// </summary>
    /// <param name="database"></param>
    /// <returns></returns>
    public async Task<IEnumerable<TableSchema>> DumpDatabaseAsync(IDatabase database)
    {
        var tableNames = await database.GetTableNamesAsync();

        var schemas = tableNames.Select(tableName => new TableSchema(tableName)).ToList();

        foreach (var schema in schemas)
        {
            var columnsDataTable = await database.GetTableColumnsAsync(schema.TableName);
            schema.Columns = database.ColumnMapper.ToColumnDefinitions(columnsDataTable).ToList();
        }

        return schemas;
    }

}
