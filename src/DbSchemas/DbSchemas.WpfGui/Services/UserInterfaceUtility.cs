using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;

namespace DbSchemas.WpfGui.Services;

public class UserInterfaceUtility
{
    public static void RunInUiThread(Action action)
    {
        Application.Current.Dispatcher.Invoke(() =>
        {
            action();
        });
    }
}
