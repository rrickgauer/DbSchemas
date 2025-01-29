
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace DbSchemas.WpfGui.Views.Pages.Connections;

/// <summary>
/// Interaction logic for ConnectionsPage.xaml
/// </summary>
public partial class ConnectionsPage : INavigableView<ConnectionsPageViewModel>
{
    public ConnectionsPageViewModel ViewModel { get; set; }

    public ConnectionsPage(ConnectionsPageViewModel viewModel)
    {
        ViewModel = viewModel;
        DataContext = this;

        InitializeComponent();
    }

    private void ListView_PreviewMouseWheel(object sender, MouseWheelEventArgs e)
    {
        if (!e.Handled)
        {
            e.Handled = true;
            var eventArg = new MouseWheelEventArgs(e.MouseDevice, e.Timestamp, e.Delta)
            {
                RoutedEvent = UIElement.MouseWheelEvent,
                Source = sender
            };
            var parent = ((Control)sender).Parent as UIElement;
            parent?.RaiseEvent(eventArg);
        }
    }
}
