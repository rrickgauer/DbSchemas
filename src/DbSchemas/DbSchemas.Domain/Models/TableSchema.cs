using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Domain.Models;

public class TableSchema
{
    public string TableName { get; set; }
    public List<ColumnDefinition> Columns { get; set; } = new();

    public TableSchema(string tableName)
    {
        TableName = tableName;
    }

    public TableSchema(string tableName, List<ColumnDefinition> columns) : this(tableName)
    {
        Columns = columns;
    }
}
