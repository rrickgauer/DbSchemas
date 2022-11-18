using ConsoleTables;
using DbSchemas.Domain.Databases;
using DbSchemas.Domain.Enums;
using DbSchemas.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace DbSchemas.Services;

public static class OutputService
{
    /// <summary>
    /// Write the given data to the file
    /// </summary>
    /// <param name="data"></param>
    /// <param name="destination"></param>
    /// <returns></returns>
    public static async Task WriteDataToFile(object data, FileInfo destination)
    {
        using FileStream fileStream = destination.OpenWrite();
        using StreamWriter sw = new(fileStream);

        await sw.WriteAsync(data.ToString());

        sw.Close();
        fileStream.Close();
    }


    /// <summary>
    /// Format the given database dump to a string
    /// </summary>
    /// <param name="dumpResult"></param>
    /// <returns></returns>
    public static string FormatDatabaseDump(IEnumerable<TableSchema> dumpResult)
    {
        string output = string.Empty;

        foreach (var tableSchema in dumpResult)
        {
            string tableOutput = ToConsoleTableString(tableSchema.Columns, ConsoleOutputFormat.Compact);

            output += SpaceWrap(tableSchema.TableName, 2, 0);
            output += SpaceWrap(tableOutput, 2, 2);
        }

        return output;
    }

    /// <summary>
    /// Create a readable table output string of the given collection of items
    /// </summary>
    /// <typeparam name="T"></typeparam>
    /// <param name="items"></param>
    /// <param name="format"></param>
    /// <returns></returns>
    public static string ToConsoleTableString<T>(IEnumerable<T> items, ConsoleOutputFormat format)
    {
        var consoleTable = ConsoleTable.From(items);
        consoleTable.Options.NumberAlignment = Alignment.Left;

        return FormatConsoleTable(consoleTable, format);
    }

    /// <summary>
    /// Format the given ConsoleTable to the specified format
    /// </summary>
    /// <param name="table"></param>
    /// <param name="format"></param>
    /// <returns></returns>
    private static string FormatConsoleTable(ConsoleTable table, ConsoleOutputFormat format)
    {
        string result = format switch
        {
            ConsoleOutputFormat.Compact => table.ToMinimalString(),
            ConsoleOutputFormat.Markdown => table.ToMarkDownString(),
            _ => table.ToStringAlternative(),
        };

        return result;
    }

    /// <summary>
    /// Wrap the given object in the number of specified new lines
    /// </summary>
    /// <param name="data"></param>
    /// <param name="spaceTop"></param>
    /// <param name="spaceBottom"></param>
    /// <returns></returns>
    public static string SpaceWrap(object data, uint spaceTop, uint spaceBottom = 1)
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


    public static string ToJson(object data)
    {
        var options = new JsonSerializerOptions { WriteIndented = true };
        string jsonString = JsonSerializer.Serialize(data, options);

        return jsonString;
    }


}
