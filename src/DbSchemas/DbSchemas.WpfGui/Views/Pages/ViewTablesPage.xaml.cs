using DbSchemas.WpfGui.ViewModels;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Wpf.Ui.Common.Interfaces;

namespace DbSchemas.WpfGui.Views.Pages;

/// <summary>
/// Interaction logic for ViewTablesPage.xaml
/// </summary>
public partial class ViewTablesPage : INavigableView<ViewTablesPageViewModel>
{
    public ViewTablesPageViewModel ViewModel { get; set; }

    public ViewTablesPage(ViewTablesPageViewModel viewModel)
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
