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
    private readonly OutputService _outputService;

    public CliService(DatabaseConnectionRecordService databaseConnectionRecordService, OutputService outputService)
    {
        _databaseConnectionRecordService = databaseConnectionRecordService;
        _outputService = outputService;
    }

    public async Task AddConnection(AddCliArgs args)
    {
        var connection = args.ToDatabaseConnectionRecord();

        var success = await _databaseConnectionRecordService.InsertDatabaseAsync(connection);

        if (success)
        {
            Console.WriteLine($"{Environment.NewLine}Added!");
        }

        await ListConnections();
    }



    /// <summary>
    /// Display all the user's connections 
    /// </summary>
    /// <returns></returns>
    public async Task ListConnections()
    {
        var databases = await _databaseConnectionRecordService.GetDatabasesAsync();
        var connections = databases.Select(db => db.DatabaseConnectionRecord);

        var output = _outputService.ToConsoleTableString(connections, ConsoleOutputFormat.Compact);
        Console.WriteLine(_outputService.SpaceWrap(output, 2, 2));
    }
}
