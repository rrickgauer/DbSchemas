using CommunityToolkit.Mvvm.ComponentModel;
using DbSchemas.WpfGui.Views.Pages.Connections;
using DbSchemas.WpfGui.Views.Pages.Home;
using DbSchemas.WpfGui.Views.Pages.Settings;
using System.Collections.ObjectModel;

namespace DbSchemas.WpfGui.Views.Windows;

public partial class ContainerViewModel : ObservableObject
{
    #region - Generated Properties -

    [ObservableProperty]
    private string _applicationTitle = "Database Schemas";

    [ObservableProperty]
    private ObservableCollection<object> _menuItems = new()
    {
            new NavigationViewItem()
            {
                Content = "Home",
                Icon = new SymbolIcon(SymbolRegular.Home20),
                TargetPageType = typeof(HomePage)
            },

            new NavigationViewItem()
            {
                Content = "Connections",
                Icon = new SymbolIcon(SymbolRegular.DatabasePlugConnected20),
                TargetPageType = typeof(ConnectionsPage)
            },
    };

    [ObservableProperty]
    private ObservableCollection<object> _footerMenuItems = new()
    {
        new NavigationViewItem()
        {
            Content = "Settings",
            Icon = new SymbolIcon { Symbol = SymbolRegular.Settings24 },
            TargetPageType = typeof(SettingsPage)
        }
    };

    [ObservableProperty]
    private ObservableCollection<MenuItem> _trayMenuItems = new()
    {
        new MenuItem { Header = "Home", Tag = "tray_home" }
    };

    #endregion
}
