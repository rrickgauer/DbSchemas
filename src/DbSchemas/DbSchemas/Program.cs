using DbSchemas.Configurations;
using DbSchemas.Domain.Enums;
using DbSchemas.Repository;
using DbSchemas.Services;
using Microsoft.Extensions.DependencyInjection;

// setup DI
ServiceCollection serviceCollection = new();

serviceCollection.AddScoped<IConfigs, ConfigurationProduction>();

serviceCollection.AddScoped<ProgramDataService>();
serviceCollection.AddScoped<DatabaseConnectionRecordService>();
serviceCollection.AddScoped<DumpService>();

serviceCollection.AddScoped<DatabaseConnectionRecordRepository>();

var serviceProvider = serviceCollection.BuildServiceProvider();

// setup the program data
var programDataService = serviceProvider.GetRequiredService<ProgramDataService>();
programDataService.SetupProgramData();

// get the databases
var databaseService = serviceProvider.GetRequiredService<DatabaseConnectionRecordService>();
var databaseRecords = (await databaseService.GetDatabasesAsync()).ToList();

var dumpService = serviceProvider.GetRequiredService<DumpService>();
var schema = await dumpService.DumpDatabaseAsync(databaseRecords[25]);

int x = 0;

