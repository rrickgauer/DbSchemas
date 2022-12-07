using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using DbSchemas.Domain.Databases;
using DbSchemas.Domain.Enums;
using DbSchemas.Services;
using DbSchemas.WpfGui.Views.Pages;
using DbSchemas.WpfGui.Views.UserControls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using Wpf.Ui.Common.Interfaces;
using Wpf.Ui.Controls.Interfaces;
using Wpf.Ui.Mvvm.Contracts;

namespace DbSchemas.WpfGui.ViewModels;

public partial class ConnectionsPageViewModel : ObservableObject, INavigationAware
{
    #region - Private members -
    private readonly DatabaseConnectionRecordService _connectionRecordService;
    private readonly EditConnectionPageViewModel _editConnectionPageViewModel;
    private readonly INavigation _navigation = App.GetService<INavigationService>().GetNavigationControl();
    #endregion

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="connectionRecordService"></param>
    /// <param name="editConnectionPageViewModel"></param>
    public ConnectionsPageViewModel(DatabaseConnectionRecordService connectionRecordService, EditConnectionPageViewModel editConnectionPageViewModel)
    {
        _connectionRecordService = connectionRecordService;
        _editConnectionPageViewModel = editConnectionPageViewModel;
    }

    [ObservableProperty]
    private string _connectionNameSearch = string.Empty;

    [ObservableProperty]
    private IEnumerable<ConnectionCardUserControl> _connectionCards = Enumerable.Empty<ConnectionCardUserControl>();

    private IEnumerable<IDatabase> _allDatabases = Enumerable.Empty<IDatabase>();

    public IEnumerable<DatabaseType> DatabaseTypeFilterOptions => Enum.GetValues(typeof(DatabaseType)).Cast<DatabaseType>();

    [ObservableProperty]
    private DatabaseType? _selectedDatabaseTypeFilterOption = null;

    [ObservableProperty]
    private bool _isLoading = false;


    #region - INavigationAware -
    public void OnNavigatedFrom()
    {
        //throw new NotImplementedException();
    }

    public async void OnNavigatedTo()
    {
        await Task.Run(() => FetchAllDatabases());
    }
    #endregion

    partial void OnConnectionNameSearchChanged(string value)
    {
        DisplayDatabases();
    }

    partial void OnSelectedDatabaseTypeFilterOptionChanged(DatabaseType? value)
    {
        DisplayDatabases();
    }

    private async Task FetchAllDatabases()
    {
        IsLoading = true;

        _allDatabases = await _connectionRecordService.GetDatabasesAsync();

        Application.Current.Dispatcher.Invoke(delegate {
            RenderConnectionCardControls(_allDatabases);
        });

        IsLoading = false;

    }

    /// <summary>
    /// Create a new list of ConnectionCardUserControl objects and displays them using the specified databases
    /// </summary>
    /// <param name="connections"></param>
    private void RenderConnectionCardControls(IEnumerable<IDatabase> connections)
    {
        List<ConnectionCardUserControl> cards = new();

        foreach (var con in connections)
        {
            ConnectionCardViewModel viewModel = new(con);
            ConnectionCardUserControl control = new(viewModel);
            cards.Add(control);

            control.ViewModel.WasDeleted += TestEvent;
        }

        ConnectionCards = cards;
        
    }


    private async void TestEvent(object? sender, EventArgs args)
    {
        IsLoading = true;
        await Task.Run(() => FetchAllDatabases());
        IsLoading = false;
    }

    public void DisplayDatabases()
    {
        // start with all of them
        ConnectionCards.ToList().ForEach(c => c.ViewModel.IsVisible = true);

        // filter out ones that have the matching db type (if set)
        if (SelectedDatabaseTypeFilterOption != null)
        {
            ConnectionCards.Where(c => c.ViewModel.Database.DatabaseConnectionRecord.DatabaseType != SelectedDatabaseTypeFilterOption).ToList().ForEach(c => c.ViewModel.IsVisible = false);
        }

        // filter out ones that have a name within the search box value
        if (!string.IsNullOrWhiteSpace(ConnectionNameSearch) && ConnectionNameSearch.Length > 2)
        {
            ConnectionCards.Where(c => !c.ViewModel.Database.DatabaseConnectionRecord.Name.ToLower().Contains(ConnectionNameSearch.ToLower())).ToList().ForEach(c => c.ViewModel.IsVisible = false);
        }
    }

    /// <summary>
    /// Navigate to the Edit connection page to create a new connection.
    /// </summary>
    [RelayCommand]
    public void CreateNewConnection()
    {
        _editConnectionPageViewModel.CreateNewConnection();
        _navigation.Navigate(typeof(EditConnectionPage));

    }

    [RelayCommand]
    public void ClearDbTypeFilterSelection()
    {
        SelectedDatabaseTypeFilterOption = null;
    }
}
