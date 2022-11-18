using CommunityToolkit.Mvvm.ComponentModel;
using DbSchemas.Domain.Databases;
using DbSchemas.Domain.Enums;
using DbSchemas.Services;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
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

    public IEnumerable<DatabaseType> MyEnumTypeValues => Enum.GetValues(typeof(DatabaseType)).Cast<DatabaseType>();

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
