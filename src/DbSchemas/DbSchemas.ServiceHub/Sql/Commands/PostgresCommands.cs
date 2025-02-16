using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Sql.Commands;
public sealed class PostgresCommands
{

    public const string SelectAllColumns = @"

        SELECT
            table_name,
            ordinal_position,
            column_name,
            concat_ws(' ', data_type, character_maximum_length) as data_type,
            is_nullable,
            column_default
        FROM
            information_schema.columns
        WHERE
            table_schema = 'public'
        ORDER BY
            table_name ASC,
            ordinal_position ASC;";

}
