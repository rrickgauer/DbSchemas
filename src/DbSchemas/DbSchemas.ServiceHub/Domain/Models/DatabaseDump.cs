using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Domain.Models;

public class DatabaseDump
{
    public IEnumerable<TableSchema> TableSchemas { get; set; } = Enumerable.Empty<TableSchema>();
}
