using CommandLine;
using DbSchemas.Configurations;
using DbSchemas.Domain.CliArgs;
using DbSchemas.Repository;
using DbSchemas.Services;
using Microsoft.Extensions.DependencyInjection;
using System.Diagnostics;

#region Dependency injection
ServiceCollection serviceCollection = new();

serviceCollection.AddScoped<IConfigs, ConfigurationDev>();
serviceCollection.AddScoped<ProgramDataService>();
serviceCollection.AddScoped<DatabaseConnectionRecordService>();
serviceCollection.AddScoped<DumpService>();
serviceCollection.AddScoped<DatabaseConnectionRecordRepository>();

ServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();

#endregion

// setup the program data
var programDataService = serviceProvider.GetRequiredService<ProgramDataService>();
programDataService.SetupProgramData();


var databaseService = serviceProvider.GetRequiredService<DatabaseConnectionRecordService>();
var dumpService = serviceProvider.GetRequiredService<DumpService>();
IConfigs configs = serviceProvider.GetRequiredService<IConfigs>();

Parser.Default.ParseArguments<AddCliArgs, ListCliArgs, GuiCliArgs, ViewCliArgs, EditCliArgs, DeleteCliArgs>(args)
    .WithParsed<AddCliArgs>(addCliArgs =>
    {
        Console.WriteLine("add new connection");
    })

    .WithParsed<ListCliArgs>(listCliArgs =>
    {
        Console.WriteLine("list connections");
    })


    .WithParsed<ViewCliArgs>(viewArgs =>
    {
        Console.WriteLine("view connection");
    })
    .WithParsed<EditCliArgs>(editArgs =>
    {
        Console.WriteLine("edit connection");
    })
    .WithParsed<DeleteCliArgs>(deleteArgs =>
    {
        Console.WriteLine("delete connection");
    })

    .WithParsed<GuiCliArgs>(guiCliArgs =>
    {
        Process.Start(configs.GuiFile.FullName);
    })




    .WithNotParsed(errors => 
    {
        // error
    });



