using System.Collections.Generic;
using System;
using System.Windows.Controls;
using System.Linq;
using DbSchemas.ServiceHub.Domain.Models;
using System.Collections.ObjectModel;

namespace DbSchemas.WpfGui.Views.UserControls.TableSchemas;

/// <summary>
/// Interaction logic for TableSchemaControl.xaml
/// </summary>
public partial class TableSchemaControl : UserControl
{
    public TableSchemaViewModel ViewModel { get; set; }

    public TableSchemaControl(TableSchemaViewModel viewModel)
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
        catch (InvalidCastException)
        {
            return;
        }
        catch (ArgumentException)
        {
            return;
        }
    }
}


public static class TableSchemaControlExtensions
{
    /// <summary>
    /// Build a list of TableSchemaControl's from the given list of table schemas.
    /// </summary>
    /// <param name="tableSchemas"></param>
    /// <returns></returns>
    public static ObservableCollection<TableSchemaControl> ToUserControls(this IEnumerable<TableSchema> tableSchemas)
    {
        var controls = tableSchemas.Select(schema =>
        {
            TableSchemaViewModel viewModel = new(schema);
            TableSchemaControl control = new(viewModel);
            return control;
        });

        return new(controls);
    }


    public static bool ContainsTable(this IEnumerable<TableSchemaControl> controls, TableSchema table)
    {
        return controls.Select(c => c.ViewModel.TableSchema).Contains(table);
    }

    public static List<TableSchema> GetTables(this IEnumerable<TableSchemaControl> controls)
    {
        return controls.Select(c => c.ViewModel.TableSchema).ToList();
    }

}

