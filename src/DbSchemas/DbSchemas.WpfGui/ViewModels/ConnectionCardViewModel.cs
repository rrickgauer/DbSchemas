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
    private readonly INavigation _navigation = App.GetService<INavigationService>().GetNavigationControl();
    private readonly EditConnectionPage _viewNotePage = App.GetService<EditConnectionPage>();

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


    [RelayCommand]
    public async Task EditConnectionAsync()
    {
        int x = 10;
    }
}
