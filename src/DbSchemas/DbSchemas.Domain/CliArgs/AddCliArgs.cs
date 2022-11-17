using CommandLine;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Domain.CliArgs;

[Verb("add", HelpText = "Add a new database connection")]
public class AddCliArgs
{
    [Option("name", Required = false, HelpText = "Name of the connection.")]
    public string? Name { get; set; }
}
