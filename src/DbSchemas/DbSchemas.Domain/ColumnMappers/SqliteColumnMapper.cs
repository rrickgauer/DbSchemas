using DbSchemas.Domain.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Domain.ColumnMappers;

public class SqliteColumnMapper : IColumnMapper
{
    public ColumnDefinition ToColumnDefinition(DataRow row)
    {
        ColumnDefinition columnDefinition = new()
        {
            Position = Convert.ToUInt32(row.Field<long>("cid")),
            Name = row.Field<string>("name"),
            Type = row.Field<string>("type"),
            IsNullable = row.Field<long>("notnull") == 0,
            DefaultValue = row["dflt_value"]
        };

        return columnDefinition;
    }
}
