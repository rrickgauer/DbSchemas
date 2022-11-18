using CommunityToolkit.Mvvm.ComponentModel;
using DbSchemas.Domain.Databases;
using DbSchemas.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wpf.Ui.Common.Interfaces;

namespace DbSchemas.WpfGui.ViewModels;

public partial class ConnectionsPageViewModel : ObservableObject, INavigationAware
{
    private readonly DatabaseConnectionRecordService _connectionRecordService;

    public ConnectionsPageViewModel(DatabaseConnectionRecordService connectionRecordService)
    {
        _connectionRecordService = connectionRecordService;
    }

    [ObservableProperty]
    private string _connectionNameSearch = string.Empty;

    [ObservableProperty]
    private IEnumerable<IDatabase> _connections = new List<IDatabase>();

    [ObservableProperty]
    private IDatabase? _selectedConnection = null;


    #region INavigationAware
    public void OnNavigatedFrom()
    {
        //throw new NotImplementedException();
    }

    public async void OnNavigatedTo()
    {
        await LoadConnectionsAsync();
    }
    #endregion



    public async Task LoadConnectionsAsync()
    {
        Connections = await _connectionRecordService.GetDatabasesAsync();

        int x = 10;
    }

}
