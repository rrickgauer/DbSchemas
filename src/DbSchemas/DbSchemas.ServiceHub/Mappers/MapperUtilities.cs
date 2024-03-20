using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Mappers;

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
        var fieldValue = row.Field<string?>(column);

        if (fieldValue == null) return null;

        return DateTime.Parse(fieldValue);
    }
}
