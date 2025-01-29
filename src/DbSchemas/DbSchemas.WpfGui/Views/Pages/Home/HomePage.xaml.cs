

namespace DbSchemas.WpfGui.Views.Pages.Home;

/// <summary>
/// Interaction logic for HomePage.xaml
/// </summary>
public partial class HomePage : INavigableView<HomePageViewModel>
{
    public HomePage(HomePageViewModel viewModel)
    {
        ViewModel = viewModel;
        DataContext = this;

        InitializeComponent();
    }

    public HomePageViewModel ViewModel { get; set; }
}

