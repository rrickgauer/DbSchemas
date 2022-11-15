using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Domain.Models;

public class TableSchema
{
    public uint? Position { get; set; } = 0;
    public string? Name { get; set; }
    public string? Type { get; set; }
    public bool? IsNullable { get; set; } = true;
    public object? DefaultValue { get; set; }
    public object? Extra { get; set; }
}
