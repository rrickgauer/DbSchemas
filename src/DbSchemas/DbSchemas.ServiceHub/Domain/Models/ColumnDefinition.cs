using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Domain.Models;

public class ColumnDefinition
{
    public uint? Position { get; set; } = 0;
    public string? Name { get; set; }
    public string? Type { get; set; }
    public bool? IsNullable { get; set; } = true;
    public object? DefaultValue { get; set; }
    public object? Extra { get; set; }
}
