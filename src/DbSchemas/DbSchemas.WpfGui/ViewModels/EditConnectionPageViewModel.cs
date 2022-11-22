using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using DbSchemas.Domain.Databases;
using DbSchemas.Domain.Enums;
using DbSchemas.Services;
using DbSchemas.WpfGui.Views.Pages;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wpf.Ui.Common.Interfaces;
using Wpf.Ui.Controls.Interfaces;
using Wpf.Ui.Mvvm.Contracts;

namespace DbSchemas.WpfGui.ViewModels;

public partial class EditConnectionPageViewModel : ObservableObject, INavigationAware
{
    private readonly DatabaseConnectionRecordService _connectionRecordService;
    private readonly INavigation _navigation = App.GetService<INavigationService>().GetNavigationControl();

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="connectionRecordService"></param>
    public EditConnectionPageViewModel(DatabaseConnectionRecordService connectionRecordService)
    {
        _connectionRecordService = connectionRecordService;
    }

    [ObservableProperty]
    private IDatabase? _database = null;

    public IEnumerable<DatabaseType> MyEnumTypeValues => Enum.GetValues(typeof(DatabaseType)).Cast<DatabaseType>();


    public bool CanUpdateConnection 
    { 
        get
        {
            if (string.IsNullOrEmpty(Database.DatabaseConnectionRecord.Name))
            {
                return false;
            }

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


    [RelayCommand]
    public async Task SaveConnectionChangesAsync()
    {
        if (!CanUpdateConnection) return;

        await _connectionRecordService.SaveDatabaseAsync(Database.DatabaseConnectionRecord);

        ClosePage();
    }

    [RelayCommand]
    public void ClosePage()
    {
        _navigation.Navigate(typeof(ConnectionsPage));
    }


}
