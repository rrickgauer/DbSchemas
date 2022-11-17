using CommandLine;
using DbSchemas.Configurations;
using DbSchemas.Domain.CliArgs;
using DbSchemas.Services;
using Microsoft.Extensions.DependencyInjection;
using System.Diagnostics;

namespace DbSchemas;

public class ApplicationRouter
{
    private readonly IServiceProvider _serviceProvider;
    private readonly string[] _args;
    private readonly IConfigs _configs;
    private readonly ProgramDataService _programDataService;

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="serviceProvider"></param>
    /// <param name="args"></param>
    public ApplicationRouter(IServiceProvider serviceProvider, string[] args)
    {
        _serviceProvider = serviceProvider;
        _args = args;
        _configs = _serviceProvider.GetRequiredService<IConfigs>();
        _programDataService = _serviceProvider.GetRequiredService<ProgramDataService>();

        _programDataService.SetupProgramData();
    }

    /// <summary>
    /// Route the application using the object's cli arguments
    /// </summary>
    public void RouteApplication()
    {
        // parse the args
        var parseResult = Parser.Default.ParseArguments<AddCliArgs, ListCliArgs, GuiCliArgs, ViewCliArgs, EditCliArgs, DeleteCliArgs>(_args);

        // execute the appropriate routine
        parseResult.WithParsed<AddCliArgs>(Add)
            .WithParsed<ListCliArgs>(List)
            .WithParsed<ViewCliArgs>(View)
            .WithParsed<EditCliArgs>(Edit)
            .WithParsed<DeleteCliArgs>(Delete)
            .WithParsed<GuiCliArgs>(Gui)
            .WithNotParsed(HandleParseError);
    }

    private void Add(AddCliArgs cliArgs)
    {
        Console.WriteLine("add new connection");
    }


    private void List(ListCliArgs cliArgs)
    {
        Console.WriteLine("list connections");
    }


    private void View(ViewCliArgs cliArgs)
    {
        Console.WriteLine("view connection");
    }


    private void Edit(EditCliArgs cliArgs)
    {
        Console.WriteLine("edit connection");
    }

    private void Delete(DeleteCliArgs cliArgs)
    {
        Console.WriteLine("delete connection");
    }

    private void Gui(GuiCliArgs cliArgs)
    {
        Process.Start(_configs.GuiFile.FullName);
    }

    private void HandleParseError(IEnumerable<Error> parseErrors)
    {
        Console.WriteLine("errors");
    }

}
