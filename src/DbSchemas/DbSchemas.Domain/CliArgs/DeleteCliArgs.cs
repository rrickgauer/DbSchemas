using CommandLine;

namespace DbSchemas.Domain.CliArgs;

[Verb("delete", HelpText = "Delete an existing connection.")]
public class DeleteCliArgs
{
    [Value(0, Required = true, HelpText = "Connection name")]
    public string? Name { get; set; }
}
