using ConsoleTables;
using DbSchemas.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Services;

public class OutputService
{
    public string ToConsoleTableString<T>(IEnumerable<T> items, ConsoleOutputFormat format)
    {
        var consoleTable = ConsoleTable.From(items);
        consoleTable.Options.NumberAlignment = Alignment.Left;

        return FormatConsoleTable(consoleTable, format);
    }

    private string FormatConsoleTable(ConsoleTable table, ConsoleOutputFormat format)
    {
        string result = format switch
        {
            ConsoleOutputFormat.Compact => table.ToMinimalString(),
            ConsoleOutputFormat.Markdown => table.ToMarkDownString(),
            _ => table.ToStringAlternative(),
        };

        return result;
    }


    public string SpaceWrap(object data, uint spaceTop, uint spaceBottom = 1)
    {
        string result = string.Empty;

        for (uint count = 0; count < spaceTop; count++)
        {
            result += $"{Environment.NewLine}";
        }

        result += data.ToString();

        for (uint count = 0; count < spaceBottom; count++)
        {
            result += $"{Environment.NewLine}";
        }

        return result;
    }
}
