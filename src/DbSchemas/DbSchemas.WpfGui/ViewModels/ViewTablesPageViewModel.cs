using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using DbSchemas.ServiceHub.Domain.CustomExceptions;
using DbSchemas.ServiceHub.Domain.Databases;
using DbSchemas.ServiceHub.Domain.Models;
using DbSchemas.ServiceHub.Services;
using DbSchemas.WpfGui.Views.Pages;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;


namespace DbSchemas.WpfGui.ViewModels;

public partial class ViewTablesPageViewModel : ObservableObject, INavigationAware
{
    #region - Private members -
    private readonly INavigationView _navigation = App.GetService<INavigationService>().GetNavigationControl();
    private readonly EditConnectionPage _editConnectionPage = App.GetService<EditConnectionPage>();
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
    //private ObservableCollection<TableSchemaUserControl> _tableSchemas = new();
    private ObservableCollection<TableSchema> _tableSchemas = new();

    [ObservableProperty]
    private bool _statusMessageIsVisible = false;

    [ObservableProperty]
    private string _statusMessageText = string.Empty;

    private DatabaseDump _databaseDump = new();

    [ObservableProperty]
    private ObservableCollection<TableSchema> _openTables = new();



    public void OpenTablesAsync(IEnumerable<TableSchema> tables)
    {
        foreach(var openTable in OpenTables)
        {
            if (!tables.Contains(openTable))
            {
                OpenTables.Remove(openTable);
            }
        }

        foreach(var table in tables)
        {
            if (!OpenTables.Contains(table))
            {
                OpenTables.Add(table);
            }
        }

    }

    public void OpenTableAsync(TableSchema table)
    {
        if (OpenTables.Contains(table))
        {
            return;
        }

        OpenTables.Add(table);
    }



    #region - INavigationAware -
    public void OnNavigatedFrom()
    {
        ResetControls();
    }

    public async void OnNavigatedTo()
    {
        await Task.Run(() => LoadTablesAsync());
    }
    #endregion


    /// <summary>
    /// Close the page and navigate back to the connections page.
    /// Generated command: ClosePageCommand.
    /// </summary>
    [RelayCommand]
    public void ClosePage()
    {
        _navigation.Navigate(typeof(ConnectionsPage));
    }

    /// <summary>
    /// Navigate to the edit connection page.
    /// </summary>
    /// <param name="expandAll"></param>
    [RelayCommand]
    public void ToggleCardsExpansion(bool expandAll)
    {
        //foreach (var control in TableSchemas)
        //{
        //    control.ViewModel.IsExpanded = expandAll;
        //}

        

        var ss = 1;
    }

    [RelayCommand]
    public void EditConnection()
    {
        _editConnectionPage.ViewModel.Database = Database;
        _navigation.Navigate(typeof(EditConnectionPage));
    }


    #region - Export data -
    [RelayCommand]
    public async Task ExportDataAsync()
    {
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
            FileName = $"{Database?.DatabaseConnectionRecord.Name}-schemas",        // Default file name
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


    private static void OpenFile(string fileName)
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

        try
        {
            _databaseDump = await _dumpService.DumpDatabase(Database);

            // display the tables in the main thread
            Application.Current.Dispatcher.Invoke(() =>
            {
                TableSchemas = new(_databaseDump.TableSchemas);
            });

        }
        catch (InvalidConnectionException)
        {
            StatusMessageText = "Could not connect to the database...";
            StatusMessageIsVisible = true;
        }
        finally
        {
            IsLoading = false;
        }

    }

    private void ResetControls()
    {
        StatusMessageIsVisible = false;
        StatusMessageText = string.Empty;
        IsLoading = true;
        TableSchemas = new();
    }
}
