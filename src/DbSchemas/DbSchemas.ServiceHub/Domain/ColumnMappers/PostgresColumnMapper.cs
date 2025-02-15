using DbSchemas.ServiceHub.Domain.Models;
using System.Data;

namespace DbSchemas.ServiceHub.Domain.ColumnMappers;

public class PostgresColumnMapper : IColumnMapper
{
    public ColumnDefinition ToColumnDefinition(DataRow row)
    {
        ColumnDefinition columnDefinition = new()
        {
            Position = Convert.ToUInt32(row.Field<object>("ordinal_position")),
            Name = row.Field<string>("column_name"),
            Type = row.Field<string>("data_type"),
            IsNullable = row.Field<string>("is_nullable") == "YES",
            DefaultValue = row["column_default"],
        };

        return columnDefinition;
    }
}