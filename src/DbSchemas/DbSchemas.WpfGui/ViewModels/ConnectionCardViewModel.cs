using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using DbSchemas.ServiceHub.Domain.Databases;
using DbSchemas.ServiceHub.Services;
using DbSchemas.WpfGui.Views.Pages;
using System;
using System.Threading.Tasks;
using System.Windows;

namespace DbSchemas.WpfGui.ViewModels;

public partial class ConnectionCardViewModel : ObservableObject
{
    private readonly INavigationView _navigation                              = App.GetService<INavigationService>().GetNavigationControl();
    private readonly EditConnectionPage _editConnectionPage                   = App.GetService<EditConnectionPage>();
    private readonly ViewTablesPage _viewTablesPage                           = App.GetService<ViewTablesPage>();
    private readonly DatabaseConnectionRecordService _connectionRecordService = App.GetService<DatabaseConnectionRecordService>();

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="database"></param>
    public ConnectionCardViewModel(IDatabase database)
    {
        _database = database;
    }


    public EventHandler? WasDeleted;



    [ObservableProperty]
    private bool _isVisible = true;


    [ObservableProperty]
    private IDatabase _database;

    /// <summary>
    /// Open up the edit connection page for the current connection
    /// </summary>
    /// <returns></returns>
    [RelayCommand]
    public void EditConnection()
    {
        _editConnectionPage.ViewModel.Database = Database;
        _navigation.Navigate(_editConnectionPage.GetType());
    }

    /// <summary>
    /// Navigate to the view tables page for the connection.
    /// </summary>
    /// <returns></returns>
    [RelayCommand]
    public void ViewTables()
    {
        _viewTablesPage.ViewModel.Database = Database;
        _navigation.Navigate(_viewTablesPage.GetType());
    }

    [RelayCommand]
    public async Task DeleteConnectionAsync()
    {
        if (!ConfirmDelete())
            return;

        if (Database.DatabaseConnectionRecord.Id is long recordId)
        {
            await _connectionRecordService.DeleteDatabaseAsync(recordId);
            WasDeleted?.Invoke(this, EventArgs.Empty);
        }
    }

    /// <summary>
    /// Prompt user to confirm that they want to delete the connection
    /// </summary>
    /// <returns></returns>
    private static bool ConfirmDelete()
    {
        var confirmation = MessageBox.Show("Are you sure you want to delete this connection?", "Confirm deletion", MessageBoxButton.YesNoCancel, MessageBoxImage.Question);

        if (confirmation != MessageBoxResult.Yes)
        {
            return false;
        }

        return true;
    }
}
