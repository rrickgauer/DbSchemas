using DbSchemas.ServiceHub.Domain.Models;
using DbSchemas.WpfGui.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
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

        ViewModel.CopySelectedColumsEvent += OnViewModelCopySelectedColumsEvent;
    }

    private void OnViewModelCopySelectedColumsEvent(object? sender, System.EventArgs e)
    {
        var selectedItems = this.schemaGrid.SelectedItems;

        try
        {
            var columns = selectedItems.Cast<ServiceHub.Domain.Models.ColumnDefinition>();
            ViewModel.CopyColumnsToClipboard(columns);
        }
        catch(InvalidCastException)
        {
            return;
        }  
        catch(ArgumentException)
        {
            return;
        }
    }
}
