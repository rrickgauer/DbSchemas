using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using DbSchemas.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using Wpf.Ui.Common;
using Wpf.Ui.Mvvm.Contracts;

namespace DbSchemas.WpfGui.ViewModels;

public partial class TableSchemaViewModel : ObservableObject
{

    private readonly ISnackbarService _snackbarService = App.GetService<ISnackbarService>();

    /// <summary>
    /// Constructor
    /// </summary>
    /// <param name="tableSchema"></param>
    public TableSchemaViewModel(TableSchema tableSchema)
    {
        _tableSchema = tableSchema;
    }

    [ObservableProperty]
    private TableSchema _tableSchema;

    [ObservableProperty]
    private bool _isExpanded = true;

    /// <summary>
    /// Copy the column names to the clipboard
    /// </summary>
    [RelayCommand]
    public void CopyColumns()
    {
        // get a list of all the column names
        var columnNames = TableSchema.Columns.Select(c => c.Name);

        // combine each name into a string with new lines after each name
        string text = string.Empty;

        foreach(var column in columnNames)
        {
            text += $"{column}{Environment.NewLine}";
        }

        // set the clipboard text
        System.Windows.Clipboard.SetText(text);

        _snackbarService.Show("Success!", "Columns copied to clipboard.", SymbolRegular.Checkmark24);

    }

}
