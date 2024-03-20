using DbSchemas.ServiceHub.Domain.Databases;
using DbSchemas.ServiceHub.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Dumpers;

public interface IDumper
{
    public Task<DatabaseDump> DumpDatabaseAsync();
    public IDatabase DataBase { get; }
}
