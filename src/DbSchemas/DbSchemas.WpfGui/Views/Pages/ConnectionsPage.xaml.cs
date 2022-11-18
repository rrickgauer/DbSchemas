using DbSchemas.WpfGui.ViewModels;
using Wpf.Ui.Common.Interfaces;

namespace DbSchemas.WpfGui.Views.Pages;


/// <summary>
/// Interaction logic for ConnectionsPage.xaml
/// </summary>
public partial class ConnectionsPage : INavigableView<ConnectionsPageViewModel>
{
    public ConnectionsPageViewModel ViewModel { get; set; }

    public ConnectionsPage(ConnectionsPageViewModel viewModel)
    {
        ViewModel = viewModel;
        
        InitializeComponent();
    }
}
