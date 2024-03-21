using CommandLine;
using DbSchemas;
using DbSchemas.ServiceHub.Configurations;
using DbSchemas.ServiceHub.Repository;
using DbSchemas.ServiceHub.Services;
using Microsoft.Extensions.DependencyInjection;
using System.Diagnostics;

#region Dependency injection
ServiceCollection serviceCollection = new();

serviceCollection.AddScoped<IConfigs, ConfigurationDev>();
serviceCollection.AddScoped<ProgramDataService>();
serviceCollection.AddScoped<DatabaseConnectionRecordService>();
serviceCollection.AddScoped<DumpService>();
serviceCollection.AddScoped<CliService>();
serviceCollection.AddScoped<DatabaseConnectionRecordRepository>();

ServiceProvider serviceProvider = serviceCollection.BuildServiceProvider();

#endregion

// run the application
ApplicationRouter router = new(serviceProvider, args);
router.RouteApplication();




