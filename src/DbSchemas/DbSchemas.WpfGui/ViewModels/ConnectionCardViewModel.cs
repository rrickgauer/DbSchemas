using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using DbSchemas.Domain.Databases;
using System.Threading.Tasks;

namespace DbSchemas.WpfGui.ViewModels;

public partial class ConnectionCardViewModel : ObservableObject
{


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
