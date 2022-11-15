using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Sql.Commands;

public sealed class DatabaseRepositorySql
{
    public const string SelectAll = @"SELECT * FROM Databases;";
}
