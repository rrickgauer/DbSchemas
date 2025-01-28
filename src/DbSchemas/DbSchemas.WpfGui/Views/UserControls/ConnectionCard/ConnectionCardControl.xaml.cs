using DbSchemas.WpfGui.ViewModels;
using System.Windows.Controls;

namespace DbSchemas.WpfGui.Views.UserControls.ConnectionCard;

/// <summary>
/// Interaction logic for ConnectionCardControl.xaml
/// </summary>
public partial class ConnectionCardControl : UserControl
{
    public ConnectionCardViewModel ViewModel { get; set; }

    public ConnectionCardControl(ConnectionCardViewModel viewModel)
    {
        ViewModel = viewModel;

        InitializeComponent();
    }
}
