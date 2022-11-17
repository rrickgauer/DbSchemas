using CommandLine;

namespace DbSchemas.Domain.CliArgs;

[Verb("view", HelpText = "View a database schema.")]
public class ViewCliArgs
{
    [Value(0, Required = true, HelpText = "Connection name")]
    public string? Name { get; set; }
}
