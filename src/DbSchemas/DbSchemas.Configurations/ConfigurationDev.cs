using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Configurations;

public class ConfigurationDev : ConfigurationProduction, IConfigs
{
    public new bool IsProduction => false;
}
