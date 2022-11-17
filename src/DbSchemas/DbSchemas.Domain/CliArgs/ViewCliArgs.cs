﻿using CommandLine;

namespace DbSchemas.Domain.CliArgs;

[Verb("view", HelpText = "View a database schema.")]
public class ViewCliArgs
{
    [Value(0, Required = true, HelpText = "Connection name")]
    public string? Name { get; set; }

    [Option('o', "output", HelpText = "Write output to file.")]
    public string? Output { get; set; }
}
