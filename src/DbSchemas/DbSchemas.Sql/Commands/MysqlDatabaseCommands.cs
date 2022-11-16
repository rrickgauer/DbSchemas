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

    public const string SelectAllColumns = @"
        SELECT
            table_name,
            ordinal_position,
            column_name,
            column_type,
            is_nullable,
            column_default,
            extra
        FROM
            information_schema.columns t
        WHERE
            table_schema = @database_name;";
}
