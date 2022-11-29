using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using DbSchemas.Domain.Databases;
using DbSchemas.WpfGui.Views.Pages;
using System.Threading.Tasks;
using Wpf.Ui.Controls.Interfaces;
using Wpf.Ui.Mvvm.Contracts;

namespace DbSchemas.WpfGui.ViewModels;

public partial class ConnectionCardViewModel : ObservableObject
{
    private readonly INavigation _navigation                = App.GetService<INavigationService>().GetNavigationControl();
    private readonly EditConnectionPage _editConnectionPage = App.GetService<EditConnectionPage>();
    private readonly ViewTablesPage _viewTablesPage         = App.GetService<ViewTablesPage>();

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="database"></param>
    public ConnectionCardViewModel(IDatabase database)
    {
        _database = database;
    }


    [ObservableProperty]
    private IDatabase _database;

    /// <summary>
    /// Open up the edit connection page for the current connection
    /// </summary>
    /// <returns></returns>
    [RelayCommand]
    public async Task EditConnectionAsync()
    {
        _editConnectionPage.ViewModel.Database = Database;
        _navigation.Navigate(_editConnectionPage.GetType());
    }

    /// <summary>
    /// Navigate to the view tables page for the connection.
    /// </summary>
    /// <returns></returns>
    [RelayCommand]
    public async Task ViewTablesAsync()
    {
        _navigation.Navigate(_viewTablesPage.GetType());
    }
}
