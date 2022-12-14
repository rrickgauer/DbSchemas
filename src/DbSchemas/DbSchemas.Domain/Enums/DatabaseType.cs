using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Domain.Enums;

public enum DatabaseType : long
{
    MySql  = 1,
    SQLite = 2,
    Access = 3,
}
