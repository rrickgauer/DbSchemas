using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Configurations;

public partial class ConfigurationProduction : IConfigs
{
    public virtual DirectoryInfo ProgramDataFolder => new(@"C:\Users\Ryan.Rickgauer\AppData\Local\DbSchemas");

    public virtual FileInfo DatabaseTemplateFile => new(@"C:\xampp\htdocs\files\DbSchemas\src\DbSchemas\DbSchemas.Assets\DbSchemas-Data.db");

    public virtual FileInfo DatabaseFile => new(@"C:\Users\Ryan.Rickgauer\AppData\Local\DbSchemas\DbSchemas-Data.db");

    public virtual FileInfo GuiFile => new(@"C:\xampp\htdocs\files\DbSchemas\src\DbSchemas\DbSchemas.WpfGui\bin\Debug\net8.0-windows7.0\DbSchemas.WpfGui.exe");

    public virtual bool IsProduction => true;
}
