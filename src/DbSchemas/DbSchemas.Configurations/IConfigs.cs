using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Configurations;

public interface IConfigs
{
    public string DataFolderName { get; }
    public DirectoryInfo DataFolder { get; }

    //public string DatabaseFileName { get; }
    //public FileInfo DatabaseFile { get; }

    public DirectoryInfo ApplicationDirectory { get; }

    //public FileInfo DatabaseTemplateFile { get; }

    //public string SqliteExeFileName { get; }
    //public FileInfo SqliteExeFile { get; }

    //public string GuiFileName { get; }
    //public DirectoryInfo GuiFileDirectory { get; }
    //public FileInfo GuiFile { get; }
}
