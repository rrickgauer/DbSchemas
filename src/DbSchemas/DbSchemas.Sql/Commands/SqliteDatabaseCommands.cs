using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Sql.Commands;

public sealed class SqliteDatabaseCommands
{
    public const string SelectTables = @"select * from sqlite_schema where type='table';";

    public const string DescribeTable = @"select * from pragma_table_xinfo(@table_name);";

}
