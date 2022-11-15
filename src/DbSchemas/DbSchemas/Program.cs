using DbSchemas.Configurations;
using DbSchemas.Services;
using Microsoft.Extensions.DependencyInjection;

// setup DI
ServiceCollection serviceCollection = new();

serviceCollection.AddScoped<IConfigs, ConfigurationProduction>();
serviceCollection.AddScoped<ProgramDataService>();

var serviceProvider = serviceCollection.BuildServiceProvider();

// setup the program data
var programDataService = serviceProvider.GetRequiredService<ProgramDataService>();
programDataService.SetupProgramData();

int x = 0;

