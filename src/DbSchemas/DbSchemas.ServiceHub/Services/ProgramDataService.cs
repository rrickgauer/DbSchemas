/*****************************************************************************************

This class is responsible for setting up and maintaining the user's sqlite database file.

*****************************************************************************************/

using DbSchemas.ServiceHub.Configurations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Services;

public class ProgramDataService
{
    private readonly IConfigs _configs;

    public ProgramDataService(IConfigs configs)
    {
        _configs = configs;
    }

    /// <summary>
    /// Sets up the user's program data.
    /// This needs to be run at the application start up.
    /// </summary>
    public void SetupProgramData()
    {
        EnsureProgramDataFolderExists();
        EnsureUserDatabaseFileExists();
    }

    /// <summary>
    /// Makes sure the program data folder exists.
    /// Creates it if not.
    /// </summary>
    private void EnsureProgramDataFolderExists()
    {
        if (!_configs.ProgramDataFolder.Exists)
        {
            Directory.CreateDirectory(_configs.ProgramDataFolder.FullName);
        }
    }

    /// <summary>
    /// Ensures the user's app data sqlite file exists.
    /// Copies over the template file if not.
    /// </summary>
    private void EnsureUserDatabaseFileExists()
    {
        if (!_configs.DatabaseFile.Exists)
        {
            File.Copy(_configs.DatabaseTemplateFile.FullName, _configs.DatabaseFile.FullName);
        }
    }
}
