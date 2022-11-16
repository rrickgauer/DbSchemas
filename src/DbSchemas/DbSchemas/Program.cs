using DbSchemas.Configurations;
using DbSchemas.Domain.Enums;
using DbSchemas.Domain.Records;
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

var databaseService = serviceProvider.GetRequiredService<DatabaseConnectionRecordService>();
var dumpService = serviceProvider.GetRequiredService<DumpService>();

var databaseRecords = (await databaseService.GetDatabasesAsync()).ToList();
var databaseConnection = databaseRecords[0];

var schema = await dumpService.DumpDatabase(databaseConnection);

int x = 0;

