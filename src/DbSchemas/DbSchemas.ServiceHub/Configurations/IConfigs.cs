using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Configurations;

public interface IConfigs
{
    public string ProgramDataFolderName { get; }
    public DirectoryInfo ProgramDataFolder { get; }

    public DirectoryInfo ApplicationDirectory { get; }

    public FileInfo DatabaseTemplateFile { get; }
    public string DatabaseFileName { get; }
    public FileInfo DatabaseFile { get; }

    public string GuiFileName { get; }
    public DirectoryInfo GuiFileDirectory { get; }
    public FileInfo GuiFile { get; }

    public bool IsProduction { get; }
}
