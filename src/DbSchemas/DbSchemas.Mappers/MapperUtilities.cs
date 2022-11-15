using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Mappers;

internal static class MapperUtilities
{
    /// <summary>
    /// Parse datarow column value into a datetime
    /// </summary>
    /// <param name="row"></param>
    /// <param name="column"></param>
    /// <returns></returns>
    public static DateTime? ParseDateTime(DataRow row, string column)
    {
        if (row.IsNull(column)) return null;

        var fieldValue = row.Field<string>(column);

        DateTime result = DateTime.Parse(fieldValue);

        return result;
    }
}
