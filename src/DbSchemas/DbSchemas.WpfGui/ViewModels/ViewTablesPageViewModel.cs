using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using DbSchemas.Domain.Databases;
using DbSchemas.Domain.Models;
using DbSchemas.Services;
using DbSchemas.WpfGui.Views.UserControls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wpf.Ui.Common.Interfaces;
using Wpf.Ui.Controls.Interfaces;
using Wpf.Ui.Mvvm.Contracts;

namespace DbSchemas.WpfGui.ViewModels;

public partial class ViewTablesPageViewModel : ObservableObject, INavigationAware
{
    #region - Private members -
    private readonly INavigation _navigation = App.GetService<INavigationService>().GetNavigationControl();
    private readonly DumpService _dumpService;
    #endregion

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="dumpService"></param>
    public ViewTablesPageViewModel(DumpService dumpService)
    {
        _dumpService = dumpService;
    }

    [ObservableProperty]
    private bool _isLoading = false;

    [ObservableProperty]
    private IDatabase? _database;

    [ObservableProperty]
    private IEnumerable<TableSchemaUserControl> _tableSchemas = Enumerable.Empty<TableSchemaUserControl>();


    #region - INavigationAware -
    public void OnNavigatedFrom()
    {
        //throw new NotImplementedException();
    }

    public async void OnNavigatedTo()
    {
        await LoadTablesAsync();
    }
    #endregion


    /// <summary>
    /// Close the page and navigate back to the connections page.
    /// Generated command: ClosePageCommand.
    /// </summary>
    [RelayCommand]
    public void ClosePage()
    {
        _navigation.Navigate(typeof(Views.Pages.ConnectionsPage));
    }


    public async Task LoadTablesAsync()
    {
        if (Database is null)
            throw new Exception("The current IDatabase is null!");

        var dumpResult = await _dumpService.DumpDatabase(Database);

        TableSchemas = BuildTableSchemaControls(dumpResult.TableSchemas);

        int x = 10;
    }

    private static IEnumerable<TableSchemaUserControl> BuildTableSchemaControls(IEnumerable<TableSchema> tableSchemas)
    {
        List<TableSchemaUserControl> controls = new();

        foreach (TableSchema tableSchema in tableSchemas)
        {
            TableSchemaViewModel viewModel = new(tableSchema);
            TableSchemaUserControl control = new(viewModel);
            controls.Add(control);
        }

        return controls;
    }



}
