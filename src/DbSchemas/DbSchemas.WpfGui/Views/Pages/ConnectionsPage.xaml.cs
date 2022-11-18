using DbSchemas.WpfGui.ViewModels;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
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

    private void ListView_PreviewMouseWheel(object sender, System.Windows.Input.MouseWheelEventArgs e)
    {
        if (!e.Handled)
        {
            e.Handled = true;
            var eventArg = new MouseWheelEventArgs(e.MouseDevice, e.Timestamp, e.Delta);
            eventArg.RoutedEvent = UIElement.MouseWheelEvent;
            eventArg.Source = sender;
            var parent = ((Control)sender).Parent as UIElement;
            parent.RaiseEvent(eventArg);
        }
    }
}
