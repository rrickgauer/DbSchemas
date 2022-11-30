using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using DbSchemas.Domain.Databases;
using DbSchemas.Domain.Models;
using DbSchemas.Services;
using DbSchemas.WpfGui.Views.UserControls;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
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

    private DatabaseDump _databaseDump = new();


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

    [RelayCommand]
    public void ToggleCardsExpansion(bool expandAll)
    {
        foreach (var control in TableSchemas)
        {
            control.ViewModel.IsExpanded = expandAll;
        }
    }

    #region - Export data -
    [RelayCommand]
    public async Task ExportDataAsync()
    {
        int x = 10;

        // get the file location from the user
        if (!GetOutputDataFileName(out string fileName))
        {
            return;
        }

        FileInfo outputFile = new(fileName);

        // serialize the dump into a string
        string outputText = OutputService.FormatDatabaseDump(_databaseDump);

        // write the string to the file
        await OutputService.WriteDataToFile(outputText, outputFile);

        OpenFile(outputFile.FullName);
    }

    private bool GetOutputDataFileName(out string fileName)
    {
        fileName = string.Empty;

        var dialog = new Microsoft.Win32.SaveFileDialog
        {
            FileName = $"{Database.DatabaseConnectionRecord.Name}-schemas",        // Default file name
            DefaultExt = ".txt",                // Default file extension
            Filter = "Text Document(*.txt)|*.txt"   // Filter files by extension
        };

        // Show save file dialog box
        bool? result = dialog.ShowDialog();

        if (!result.HasValue) return false;
        else if (result.Value == false) return false;

        // Process save file dialog box results
        if (result == true)
        {
            // Save document
            fileName = dialog.FileName;
        }

        return true;
    }


    private void OpenFile(string fileName)
    {
        Process.Start(new ProcessStartInfo()
        {
            UseShellExecute = true,
            FileName = fileName,
        });
    }

    #endregion

    /// <summary>
    /// Load the tables and the columns
    /// </summary>
    /// <returns></returns>
    /// <exception cref="Exception"></exception>
    public async Task LoadTablesAsync()
    {
        if (Database is null)
            throw new Exception("The current IDatabase is null!");

        IsLoading = true;

        _databaseDump = await _dumpService.DumpDatabase(Database);

        TableSchemas = BuildTableSchemaControls(_databaseDump.TableSchemas);

        IsLoading = false;
    }

    /// <summary>
    /// Build a list of TableSchemaUserControl's from the given list of table schemas.
    /// </summary>
    /// <param name="tableSchemas"></param>
    /// <returns></returns>
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
