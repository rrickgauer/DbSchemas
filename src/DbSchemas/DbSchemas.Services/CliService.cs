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
    private readonly DumpService _dumpService;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="databaseConnectionRecordService"></param>
    /// <param name="outputService"></param>
    /// <param name="dumpService"></param>
    public CliService(DatabaseConnectionRecordService databaseConnectionRecordService, OutputService outputService, DumpService dumpService)
    {
        _databaseConnectionRecordService = databaseConnectionRecordService;
        _outputService = outputService;
        _dumpService = dumpService;
    }

    /// <summary>
    /// Create a new connection from the values in the cli args given.
    /// </summary>
    /// <param name="args"></param>
    /// <returns></returns>
    public async Task AddConnectionAsync(AddCliArgs args)
    {
        var connection = args.ToDatabaseConnectionRecord();

        var success = await _databaseConnectionRecordService.InsertDatabaseAsync(connection);

        if (success)
        {
            Console.WriteLine($"{Environment.NewLine}Added!");
        }

        await ListConnectionsAsync();
    }



    /// <summary>
    /// Display all the user's connections 
    /// </summary>
    /// <returns></returns>
    public async Task ListConnectionsAsync()
    {
        var databases = await _databaseConnectionRecordService.GetDatabasesAsync();
        var connections = databases.Select(db => db.DatabaseConnectionRecord);

        var output = _outputService.ToConsoleTableString(connections, ConsoleOutputFormat.Compact);
        Console.WriteLine(_outputService.SpaceWrap(output, 2, 2));
    }

    /// <summary>
    /// View the dump of a database
    /// </summary>
    /// <param name="args"></param>
    /// <returns></returns>
    public async Task ViewConnectionAsync(ViewCliArgs args)
    {
        IDatabase? database = await _databaseConnectionRecordService.GetDatabaseAsync(args.Name);

        // ensure the connection name exists
        if (database is null)
        {
            Console.WriteLine($"There is no connection with the name: {args.Name}");
            return;
        }

        // dump the database
        var dumpResult = await _dumpService.DumpDatabase(database);

        // write it to the console
        string output = _outputService.FormatDatabaseDump(dumpResult);
        Console.WriteLine(output);

        // write the output to the outputfile if specified
        if (!string.IsNullOrEmpty(args.Output))
        {
            await _outputService.WriteDataToFile(output, new(args.Output));
        }
    }
    
}
