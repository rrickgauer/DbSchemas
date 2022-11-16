using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Sql.Commands;

public sealed class MysqlDatabaseCommands
{
    public const string SelectTables = @"show tables";

    public const string DescribeTable = @"describe {0}";
}
