using DbSchemas.WpfGui.ViewModels;
using System.Windows.Controls;

namespace DbSchemas.WpfGui.Views.UserControls;

/// <summary>
/// Interaction logic for TableSchemaUserControl.xaml
/// </summary>
public partial class TableSchemaUserControl : UserControl
{
    public TableSchemaViewModel ViewModel { get; set; }

    public TableSchemaUserControl(TableSchemaViewModel viewModel)
    {
        ViewModel = viewModel;

        InitializeComponent();
    }
}
