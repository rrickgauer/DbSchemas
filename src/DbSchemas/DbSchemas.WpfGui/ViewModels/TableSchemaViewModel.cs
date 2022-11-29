using CommunityToolkit.Mvvm.ComponentModel;
using DbSchemas.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.WpfGui.ViewModels;

public partial class TableSchemaViewModel : ObservableObject
{
    public TableSchemaViewModel(TableSchema tableSchema)
    {
        _tableSchema = tableSchema;
    }


    [ObservableProperty]
    private TableSchema _tableSchema;
}
