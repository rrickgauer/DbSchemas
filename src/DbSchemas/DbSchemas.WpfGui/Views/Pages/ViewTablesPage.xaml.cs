using DbSchemas.ServiceHub.Domain.Models;
using DbSchemas.WpfGui.ViewModels;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;


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
        DataContext = this;

        InitializeComponent();

        this.tablesList.SelectionChanged += TablesList_SelectionChanged;
        
    }

    private async void TablesList_SelectionChanged(object sender, SelectionChangedEventArgs e)
    {
        var selectedTables = tablesList.SelectedItems.Cast<TableSchema>();

        ViewModel.OpenTablesAsync(selectedTables);
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
