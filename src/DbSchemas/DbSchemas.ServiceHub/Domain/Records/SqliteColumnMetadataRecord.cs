using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Domain.Records;

public class SqliteColumnMetadataRecord
{
    public string? TableName { get; set; }
    public long? ColumnId { get; set; }
    public string? ColumnName { get; set; }
    public string? Type { get; set; }
    public bool? IsNullable { get; set; }
    public string? DefaultValue { get; set; }
    public string? PrimaryKey { get; set; }
}
