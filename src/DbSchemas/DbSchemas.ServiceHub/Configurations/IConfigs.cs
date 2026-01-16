using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Configurations;

public interface IConfigs
{
    public DirectoryInfo ProgramDataFolder { get; }

    public FileInfo DatabaseTemplateFile { get; }
    public FileInfo DatabaseFile { get; }

    public FileInfo GuiFile { get; }

    public bool IsProduction { get; }
}
