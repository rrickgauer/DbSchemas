﻿using CommandLine;

namespace DbSchemas.ServiceHub.Domain.CliArgs;

[Verb("delete", HelpText = "Delete an existing connection.")]
public class DeleteCliArgs
{
    [Value(0, Required = true, HelpText = "Connection name.")]
    public string? Name { get; set; }

    [Option('f', "force", Default = false, HelpText = "Delete connection without confirmation prompt.")]
    public bool Force { get; set; } = false;
}
