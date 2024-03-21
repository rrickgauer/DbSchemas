using CommandLine;

namespace DbSchemas.ServiceHub.Domain.CliArgs;

[Verb("edit", HelpText = "Edit an existing connection.")]
public class EditCliArgs
{
    [Value(0, Required = true, HelpText = "Connection name")]
    public string? Name { get; set; }
}
