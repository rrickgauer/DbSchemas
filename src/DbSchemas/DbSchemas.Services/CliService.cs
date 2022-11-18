﻿using ConsoleTables;
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
    private readonly DumpService _dumpService;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="databaseConnectionRecordService"></param>
    /// <param name="outputService"></param>
    /// <param name="dumpService"></param>
    public CliService(DatabaseConnectionRecordService databaseConnectionRecordService, DumpService dumpService)
    {
        _databaseConnectionRecordService = databaseConnectionRecordService;
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

        var output = OutputService.ToConsoleTableString(connections, ConsoleOutputFormat.Compact);
        Console.WriteLine(OutputService.SpaceWrap(output, 2, 2));
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
        string output = OutputService.FormatDatabaseDump(dumpResult);
        Console.WriteLine(output);

        // write the output to the outputfile if specified
        if (!string.IsNullOrEmpty(args.Output))
        {
            await OutputService.WriteDataToFile(output, new(args.Output));
        }
    }
    

    /// <summary>
    /// Delete a connection
    /// </summary>
    /// <param name="args"></param>
    /// <returns></returns>
    public async Task DeleteConnectionAsync(DeleteCliArgs args)
    {
        // confirm the deletion before doing anything
        if (!ConfirmDeletion(args))
        {
            return;
        }

        // fetch the database
        IDatabase database = await _databaseConnectionRecordService.GetDatabaseAsync(args.Name);

        // make sure the connection name exists
        if (database is null)
        {
            Console.WriteLine($"{args.Name} does not exist!");
            return;
        }

        // delete the connection
        var wasDeleted = await _databaseConnectionRecordService.DeleteDatabaseAsync(database.DatabaseConnectionRecord.Id.Value);

        Console.WriteLine(OutputService.SpaceWrap("Deleted successfully!", 2, 2));
    }

    /// <summary>
    /// Have the user confirm they want to delete the connection.
    /// If the args.Force flag is true, just return true.
    /// </summary>
    /// <param name="args"></param>
    /// <returns></returns>
    private static bool ConfirmDeletion(DeleteCliArgs args)
    {
        if (args.Force)
        {
            return true;
        }

        Console.Write("Enter 'y' to confirm delete: ");
        var response = Console.ReadLine();

        return string.Equals(response, "y", StringComparison.OrdinalIgnoreCase);
    }
}
