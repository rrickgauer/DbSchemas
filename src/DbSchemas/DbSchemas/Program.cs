using DbSchemas.Configurations;
using DbSchemas.Services;
using Microsoft.Extensions.DependencyInjection;

ServiceCollection serviceCollection = new();

serviceCollection.AddScoped<IConfigs, ConfigurationProduction>();
serviceCollection.AddScoped<ProgramDataService>();

var serviceProvider = serviceCollection.BuildServiceProvider();

var programDataService = serviceProvider.GetRequiredService<ProgramDataService>();
programDataService.InitProgramDataFiles();

int x = 0;

