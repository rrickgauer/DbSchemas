using DbSchemas.WpfGui.ViewModels;
using System.Windows.Controls;


namespace DbSchemas.WpfGui.Views.Pages;

/// <summary>
/// Interaction logic for EditConnectionPage.xaml
/// </summary>
public partial class EditConnectionPage : INavigableView<EditConnectionPageViewModel>
{
    public EditConnectionPageViewModel ViewModel { get; set; }

    public EditConnectionPage(EditConnectionPageViewModel viewModel)
    {
        ViewModel = viewModel;
        DataContext = this;

        InitializeComponent();
        
    }
}
