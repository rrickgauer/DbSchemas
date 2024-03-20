using DbSchemas.ServiceHub.Domain.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Domain.ColumnMappers;

public class MysqlColumnMapper : IColumnMapper
{

    public ColumnDefinition ToColumnDefinition(DataRow row)
    {
        ColumnDefinition columnDefinition = new()
        {
            Position = row.Field<uint>("ordinal_position"),
            Name = row.Field<string>("column_name"),
            Type = row.Field<string>("column_type"),
            IsNullable = row.Field<string>("is_nullable") == "YES",
            DefaultValue = row["column_default"],
        };

        return columnDefinition;
    }
}
