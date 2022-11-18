using CommunityToolkit.Mvvm.ComponentModel;
using DbSchemas.Domain.Databases;
using DbSchemas.Services;
using Wpf.Ui.Common.Interfaces;

namespace DbSchemas.WpfGui.ViewModels;

public partial class EditConnectionPageViewModel : ObservableObject, INavigationAware
{
    private readonly DatabaseConnectionRecordService _connectionRecordService;

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

    public void OpenPage(IDatabase database)
    {
        Database = database;

        // open the page
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
}
