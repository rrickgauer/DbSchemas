using DbSchemas.ServiceHub.Domain.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Domain.ColumnMappers;

public class AccessColumnMapper : IColumnMapper
{

    public ColumnDefinition ToColumnDefinition(DataRow row)
    {
        ColumnDefinition columnDefinition = new()
        {
            Position = (uint)row.Field<int>("ColumnOrdinal"),
            Name = row.Field<string>("ColumnName"),
            IsNullable = row.Field<bool>("AllowDbNull"),
        };

        string dataType = row.Field<Type>("DataType")?.Name ?? string.Empty;
        int columnSize = row.Field<int>("ColumnSize");
        columnDefinition.Type = $"{dataType} ({columnSize})";

        return columnDefinition;
    }
}
