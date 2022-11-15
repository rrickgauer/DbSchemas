using DbSchemas.Configurations;
using DbSchemas.Domain.Enums;
using DbSchemas.Domain.Models;
using DbSchemas.Repository;
using DbSchemas.Services;
using Microsoft.Extensions.DependencyInjection;

// setup DI
ServiceCollection serviceCollection = new();

serviceCollection.AddScoped<IConfigs, ConfigurationProduction>();

serviceCollection.AddScoped<ProgramDataService>();
serviceCollection.AddScoped<DatabaseConnectionRecordService>();

serviceCollection.AddScoped<DatabaseConnectionRecordRepository>();

var serviceProvider = serviceCollection.BuildServiceProvider();

// setup the program data
var programDataService = serviceProvider.GetRequiredService<ProgramDataService>();
programDataService.SetupProgramData();

// get the databases
var databaseService = serviceProvider.GetRequiredService<DatabaseConnectionRecordService>();
var databases = await databaseService.GetDatabasesAsync();



// insert the database
//Database newDatabase = new()
//{
//    DatabaseName = "database_name",
//    DatabaseType = DatabaseType.MySql,
//    Name = "This is the newest one",
//};

//var insertResult = await databaseService.InsertDatabaseAsync(newDatabase);



//// udpate database
//var updateDb = databases.Last();
//updateDb.Name = "shit fuck cunt ass";
//await databaseService.SaveDatabaseAsync(updateDb);



await databaseService.DeleteDatabaseAsync(26);


int x = 0;

