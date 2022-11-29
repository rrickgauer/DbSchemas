using DbSchemas.WpfGui.ViewModels;
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
}
