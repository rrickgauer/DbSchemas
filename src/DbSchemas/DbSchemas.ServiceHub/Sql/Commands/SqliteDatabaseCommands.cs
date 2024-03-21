using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Sql.Commands;

public sealed class SqliteDatabaseCommands
{
    public const string SelectAllColumns = @"
        WITH all_tables AS (
            SELECT
                name
            FROM
                sqlite_master
            WHERE
                type = 'table'
        )
        SELECT
            at.name table_name,
            pti.*
        FROM
            all_tables at
            INNER JOIN pragma_table_info(at.name) pti
        ORDER BY
            table_name;";

}
