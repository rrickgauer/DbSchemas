using CommunityToolkit.Mvvm.Messaging;
using DbSchemas.ServiceHub.Domain.Models;
using DbSchemas.WpfGui.Messages;

using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace DbSchemas.WpfGui.Views.Pages.ViewTables;

/// <summary>
/// Interaction logic for ViewTablesPage.xaml
/// </summary>
public partial class ViewTablesPage : INavigableView<ViewTablesPageViewModel>, IRecipient<CloseOpenTableSchemaMessage>
{
    public ViewTablesPageViewModel ViewModel { get; set; }

    public ViewTablesPage(ViewTablesPageViewModel viewModel)
    {
        ViewModel = viewModel;
        DataContext = this;

        InitializeComponent();

        this.tablesList.SelectionChanged += TablesList_SelectionChanged;
        this.settingsDropdownButton.Click += SettingsDropdownButton_Click;

        WeakReferenceMessenger.Default.RegisterAll(this);

    }

    private void SettingsDropdownButton_Click(object sender, RoutedEventArgs e)
    {
        this.settingsDropdownButton.ContextMenu.IsOpen = true;
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

    public void Receive(CloseOpenTableSchemaMessage message)
    {
        var openTables = tablesList.SelectedItems.Cast<TableSchema>().ToList();
        var index = openTables.IndexOf(message.Value);
        tablesList.SelectedItems.RemoveAt(index);
    }

}