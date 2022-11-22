using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using DbSchemas.Domain.Databases;
using DbSchemas.Services;
using DbSchemas.WpfGui.Views.Pages;
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

public partial class ConnectionsPageViewModel : ObservableObject, INavigationAware
{
    private readonly DatabaseConnectionRecordService _connectionRecordService;
    private readonly EditConnectionPageViewModel _editConnectionPageViewModel;
    private readonly INavigation _navigation = App.GetService<INavigationService>().GetNavigationControl();

    public ConnectionsPageViewModel(DatabaseConnectionRecordService connectionRecordService, EditConnectionPageViewModel editConnectionPageViewModel)
    {
        _connectionRecordService = connectionRecordService;
        _editConnectionPageViewModel = editConnectionPageViewModel;
    }

    [ObservableProperty]
    private string _connectionNameSearch = string.Empty;

    [ObservableProperty]
    private IEnumerable<ConnectionCardUserControl> _connectionCards = Enumerable.Empty<ConnectionCardUserControl>();


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
        var connections = await _connectionRecordService.GetDatabasesAsync();
        ConnectionCards = GetConnectinUserControls(connections);
    }

    private IEnumerable<ConnectionCardUserControl> GetConnectinUserControls(IEnumerable<IDatabase> connections)
    {
        List<ConnectionCardUserControl> cards = new();

        foreach (var con in connections)
        {
            ConnectionCardViewModel viewModel = new(con);
            ConnectionCardUserControl control = new(viewModel);
            cards.Add(control);
        }

        return cards;
    }

    [RelayCommand]
    public void CreateNewConnection()
    {
        int x = 10;

        _editConnectionPageViewModel.CreateNewConnection();

        _navigation.Navigate(typeof(EditConnectionPage));

    }

}
