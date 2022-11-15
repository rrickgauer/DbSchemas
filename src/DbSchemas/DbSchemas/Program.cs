using DbSchemas.Configurations;
using DbSchemas.Repository;
using DbSchemas.Services;
using Microsoft.Extensions.DependencyInjection;

// setup DI
ServiceCollection serviceCollection = new();

serviceCollection.AddScoped<IConfigs, ConfigurationProduction>();

serviceCollection.AddScoped<ProgramDataService>();
serviceCollection.AddScoped<DatabaseService>();

serviceCollection.AddScoped<DatabaseRepository>();

var serviceProvider = serviceCollection.BuildServiceProvider();

// setup the program data
var programDataService = serviceProvider.GetRequiredService<ProgramDataService>();
programDataService.SetupProgramData();

// get the databases
var databaseService = serviceProvider.GetRequiredService<DatabaseService>();
var databases = await databaseService.GetDatabasesAsync();

int x = 0;

