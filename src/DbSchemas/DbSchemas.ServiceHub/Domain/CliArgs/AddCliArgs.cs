using CommandLine;
using DbSchemas.ServiceHub.Domain.Enums;
using DbSchemas.ServiceHub.Domain.Records;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Domain.CliArgs;

[Verb("add", HelpText = "Add a new database connection")]
public class AddCliArgs
{
    [Option("name", Required = true, HelpText = "Name of the connection.")]
    public string? Name { get; set; }

    [Option("type", Required = true, HelpText = "MySql, SQLite.")]
    public DatabaseType? DatabaseType { get; set; }

    [Option("database", Required = false, HelpText = "Database name.")]
    public string? DatabaseName { get; set; }

    [Option("username", Required = false, HelpText = "The username.")]
    public string? Username { get; set; }

    [Option("host", Required = false, HelpText = "Host / IP address.")]
    public string? Host { get; set; }

    [Option("password", Required = false, HelpText = "Database name.")]
    public string? Password { get; set; }

    [Option("file", Required = false, HelpText = "Path to the sqlite database.")]
    public string? File { get; set; }


    public DatabaseConnectionRecord ToDatabaseConnectionRecord()
    {
        DatabaseConnectionRecord record = new()
        {
            Name = Name,
            DatabaseType = DatabaseType ?? default,
            DatabaseName = DatabaseName,
            Username = Username,
            Host = Host,
            Password = Password,
            File = File,
        };

        return record;
    }
}
