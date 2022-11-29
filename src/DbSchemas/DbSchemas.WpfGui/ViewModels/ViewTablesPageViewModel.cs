using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Wpf.Ui.Common.Interfaces;
using Wpf.Ui.Controls.Interfaces;
using Wpf.Ui.Mvvm.Contracts;

namespace DbSchemas.WpfGui.ViewModels;

public partial class ViewTablesPageViewModel : ObservableObject, INavigationAware
{
    private readonly INavigation _navigation = App.GetService<INavigationService>().GetNavigationControl();

    #region - INavigationAware -
    public void OnNavigatedFrom()
    {
        //throw new NotImplementedException();
    }

    public void OnNavigatedTo()
    {
        //throw new NotImplementedException();
    }
    #endregion


    [ObservableProperty]
    private bool _isLoading = false;

    /// <summary>
    /// Close the page and navigate back to the connections page
    /// </summary>
    [RelayCommand]
    public void ClosePage()
    {
        _navigation.Navigate(typeof(Views.Pages.ConnectionsPage));
    }


}
