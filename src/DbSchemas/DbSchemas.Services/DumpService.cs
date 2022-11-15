using DbSchemas.Domain.Databases;
using DbSchemas.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Services;

public class DumpService
{

    public async Task<IEnumerable<ColumnDefinition>> DumpDatabaseAsync(IDatabase database)
    {
        List<ColumnDefinition> schemas = new();




        return schemas;
    }

}
