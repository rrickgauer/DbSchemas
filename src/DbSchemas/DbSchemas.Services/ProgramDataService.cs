/*****************************************************************************************

This class is responsible for setting up and maintaining the user's sqlite database file.



*****************************************************************************************/

using DbSchemas.Configurations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Services;

public class ProgramDataService
{
    private readonly IConfigs _configs;

    public ProgramDataService(IConfigs configs)
    {
        _configs = configs;
    }


    public void InitProgramDataFiles()
    {

    }
}
