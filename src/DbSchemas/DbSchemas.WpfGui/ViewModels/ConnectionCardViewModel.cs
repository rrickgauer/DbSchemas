using DbSchemas.Domain.Databases;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.WpfGui.ViewModels;

public class ConnectionCardViewModel
{
    public IDatabase Database { get; set; }

    public ConnectionCardViewModel(IDatabase database)
    {
        Database = database;
    }
}
