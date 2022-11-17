using CommandLine;
using DbSchemas;
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
serviceCollection.AddScoped<CliService>();
serviceCollection.AddScoped<OutputService>();
serviceCollection.AddScoped<DatabaseConnectionRecordRepository>();

ServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();

#endregion

// run the application
ApplicationRouter router = new(serviceProvider, args);
router.RouteApplication();




