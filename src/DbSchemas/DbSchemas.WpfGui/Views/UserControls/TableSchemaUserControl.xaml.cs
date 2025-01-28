using DbSchemas.ServiceHub.Domain.Models;
using DbSchemas.WpfGui.ViewModels;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
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


public static class TableSchemaUserControlExtensions
{
    /// <summary>
    /// Build a list of TableSchemaUserControl's from the given list of table schemas.
    /// </summary>
    /// <param name="tableSchemas"></param>
    /// <returns></returns>
    public static ObservableCollection<TableSchemaUserControl> ToUserControls(this IEnumerable<TableSchema> tableSchemas)
    {
        var controls = tableSchemas.Select(schema =>
        {
            TableSchemaViewModel viewModel = new(schema);
            TableSchemaUserControl control = new(viewModel);
            return control;
        });

        return new(controls);
    }
}




