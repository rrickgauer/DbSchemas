using CommandLine;
using DbSchemas.Configurations;
using DbSchemas.Domain.CliArgs;
using DbSchemas.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas;

public class ApplicationRouter
{
    private readonly ServiceProvider _serviceProvider;
    private readonly string[] _args;
    private readonly IConfigs _configs;
    private readonly ProgramDataService _programDataService;

    public ApplicationRouter(ServiceProvider serviceProvider, string[] args)
    {
        _serviceProvider = serviceProvider;
        _args = args;
        _configs = _serviceProvider.GetRequiredService<IConfigs>();
        _programDataService = _serviceProvider.GetRequiredService<ProgramDataService>();

        _programDataService.SetupProgramData();
    }

    public void RouteApplication()
    {

        var parseResult = Parser.Default.ParseArguments<AddCliArgs, ListCliArgs, GuiCliArgs, ViewCliArgs, EditCliArgs, DeleteCliArgs>(_args);

        parseResult.WithParsed<AddCliArgs>(args => Add(args))
            .WithParsed<ListCliArgs>(args => List(args))
            .WithParsed<ViewCliArgs>(args => View(args))
            .WithParsed<EditCliArgs>(args => Edit(args))
            .WithParsed<DeleteCliArgs>(args => Delete(args))
            .WithParsed<GuiCliArgs>(args => Gui(args))
            .WithNotParsed(errors => HandleParseError(errors));
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
