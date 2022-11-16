using DbSchemas.Domain.Databases;
using DbSchemas.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Dumpers;

public interface IDumper
{
    public Task<IEnumerable<TableSchema>> DumpDatabaseAsync();
}
