using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using DbSchemas.ServiceHub.Domain.Databases;
using DbSchemas.ServiceHub.Domain.Enums;
using DbSchemas.ServiceHub.Domain.Records;
using DbSchemas.ServiceHub.Services;
using DbSchemas.WpfGui.Views.Pages;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;

namespace DbSchemas.WpfGui.ViewModels;

public partial class EditConnectionPageViewModel : ObservableObject, INavigationAware
{
    private const string PageTitleNewConnectionText = "New Connection";
    private const string PageTitleEditConnectionText = "Edit Connection";


    private readonly DatabaseConnectionRecordService _connectionRecordService;
    private readonly INavigationView _navigation = App.GetService<INavigationService>().GetNavigationControl();

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="connectionRecordService"></param>
    public EditConnectionPageViewModel(DatabaseConnectionRecordService connectionRecordService)
    {
        _connectionRecordService = connectionRecordService;
    }

    [ObservableProperty]
    [NotifyPropertyChangedFor(nameof(CanDeleteConnection))]
    private IDatabase? _database = null;



    partial void OnDatabaseChanged(IDatabase? value)
    {
        PageTitle = CanDeleteConnection ? PageTitleEditConnectionText : PageTitleNewConnectionText;
    }



    [ObservableProperty]
    private string _pageTitle = PageTitleNewConnectionText;


    public IEnumerable<DatabaseType> MyEnumTypeValues => Enum.GetValues(typeof(DatabaseType)).Cast<DatabaseType>();

    public bool CanUpdateConnection 
    { 
        get
        {
            if (string.IsNullOrEmpty(Database?.DatabaseConnectionRecord.Name))
            {
                return false;
            }

            return true;
        }
    }


    public bool CanDeleteConnection
    {
        get
        {
            if (Database is null) 
                return false;

            else if (Database.DatabaseConnectionRecord is null) 
                return false;

            else if (!Database.DatabaseConnectionRecord.Id.HasValue) 
                return false;

            return true;
        }
    }

    #region INavigationAware
    public void OnNavigatedFrom()
    {
        //throw new NotImplementedException();
    }

    public void OnNavigatedTo()
    {
        //throw new NotImplementedException();
    }
    #endregion


    /// <summary>
    /// Save the connection data changes
    /// </summary>
    /// <returns></returns>
    [RelayCommand]
    public async Task SaveConnectionChangesAsync()
    {
        if (!CanUpdateConnection) return;

        if (Database!.DatabaseConnectionRecord.Id is null)
        {
            await _connectionRecordService.InsertDatabaseAsync(Database.DatabaseConnectionRecord);
        }
        else
        {
            await _connectionRecordService.SaveDatabaseAsync(Database.DatabaseConnectionRecord);
        }

        ClosePage();
    }

    /// <summary>
    /// Close the page
    /// </summary>
    [RelayCommand]
    public void ClosePage()
    {
        _navigation.Navigate(typeof(ConnectionsPage));
    }

    /// <summary>
    /// Delete the current connection
    /// </summary>
    /// <returns></returns>
    [RelayCommand]
    public async Task DeleteConnectionAsync()
    {
        if (Database?.DatabaseConnectionRecord.Id is not long recordId)
        {
            return;
        }

        if (ConfirmDelete())
        {
            await _connectionRecordService.DeleteDatabaseAsync(recordId);
            ClosePage();
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


    public void CreateNewConnection()
    {
        DatabaseConnectionRecord databaseConnectionRecord = new()
        {
            DatabaseType = DatabaseType.MySql,
        };

        MysqlDatabase newDatabase = new(databaseConnectionRecord);


        Database = newDatabase;
    }


}
