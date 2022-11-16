using CommandLine;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Domain.CliArgs;

[Verb("list", HelpText = "Display all your connections.")]
public class ListCliArgs
{
    // no options for this command
}
