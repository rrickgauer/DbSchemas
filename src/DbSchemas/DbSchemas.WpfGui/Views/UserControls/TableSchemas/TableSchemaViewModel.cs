using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using CommunityToolkit.Mvvm.Messaging;
using DbSchemas.ServiceHub.Domain.Models;
using DbSchemas.WpfGui.Messages;
using System;
using System.Collections.Generic;
using System.Linq;


namespace DbSchemas.WpfGui.Views.UserControls.TableSchemas;

public partial class TableSchemaViewModel : ObservableObject
{
    public event EventHandler<EventArgs>? CopySelectedColumsEvent;

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
    private void CopyColumns()
    {
        CopyColumnsToClipboard(TableSchema.Columns);
    }

    [RelayCommand]
    private void CopySelectedColumns()
    {
        CopySelectedColumsEvent?.Invoke(this, EventArgs.Empty);
    }

    public void CopyColumnsToClipboard(IEnumerable<ColumnDefinition> columns)
    {
        var columnNames = columns.Select(c => c.Name);

        // combine each name into a string with new lines after each name
        string text = string.Empty;

        foreach (var column in columnNames)
        {
            text += $"{column}{Environment.NewLine}";
        }

        // set the clipboard text
        System.Windows.Clipboard.SetText(text);

        _snackbarService.Show("Success!", "Columns copied to clipboard.", ControlAppearance.Secondary, new SymbolIcon(SymbolRegular.Checkmark24), TimeSpan.FromSeconds(3));
    }

    [RelayCommand]
    private void CloseTable()
    {
        WeakReferenceMessenger.Default.Send(new CloseOpenTableSchemaMessage(TableSchema));
    }

}
