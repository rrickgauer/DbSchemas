using ConsoleTables;
using DbSchemas.Domain.CliArgs;
using DbSchemas.Domain.Databases;
using DbSchemas.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Services;

public class CliService
{
    private readonly DatabaseConnectionRecordService _databaseConnectionRecordService;

    public CliService(DatabaseConnectionRecordService databaseConnectionRecordService)
    {
        _databaseConnectionRecordService = databaseConnectionRecordService;
    }

    /// <summary>
    /// Display all the user's connections 
    /// </summary>
    /// <returns></returns>
    public async Task ListConnections()
    {
        var databases = await _databaseConnectionRecordService.GetDatabasesAsync();
        var connections = databases.Select(db => db.DatabaseConnectionRecord);

        var output = GetCollectionOutputTable(connections, ConsoleOutputFormat.Compact);
        Console.WriteLine(output);
    }


    public async Task AddConnection(AddCliArgs args)
    {
        var connection = args.ToDatabaseConnectionRecord();

        var success = await _databaseConnectionRecordService.InsertDatabaseAsync(connection);
    }


    #region Console tables

    private string GetCollectionOutputTable<T>(IEnumerable<T> items, ConsoleOutputFormat format)
    {
        var consoleTable = ConsoleTable.From(items);
        consoleTable.Options.NumberAlignment = Alignment.Left;

        return FormatConsoleTable(consoleTable, format);
    }

    private string FormatConsoleTable(ConsoleTable table, ConsoleOutputFormat format)
    {
        string result = format switch
        {
            ConsoleOutputFormat.Compact  => table.ToMinimalString(),
            ConsoleOutputFormat.Markdown => table.ToMarkDownString(),
            _                            => table.ToStringAlternative(),
        };

        return result;
    }

    #endregion
}
