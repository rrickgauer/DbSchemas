using DbSchemas.Configurations;
using DbSchemas.Repository;
using DbSchemas.Services;
using Microsoft.Extensions.DependencyInjection;
using System.Diagnostics;

ServiceCollection serviceCollection = new();


serviceCollection.AddScoped<IConfigs, ConfigurationDev>();

serviceCollection.AddScoped<ProgramDataService>();
serviceCollection.AddScoped<DatabaseConnectionRecordService>();
serviceCollection.AddScoped<DumpService>();
serviceCollection.AddScoped<DatabaseConnectionRecordRepository>();
ServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();

// setup the program data
var programDataService = serviceProvider.GetRequiredService<ProgramDataService>();
programDataService.SetupProgramData();

var databaseService = serviceProvider.GetRequiredService<DatabaseConnectionRecordService>();
var dumpService = serviceProvider.GetRequiredService<DumpService>();

IConfigs configs = serviceProvider.GetRequiredService<IConfigs>();

if (args.Length == 0)
{
    Process.Start(configs.GuiFile.FullName);
    return;
}

Console.WriteLine("This is the cli");

int x = 10;


