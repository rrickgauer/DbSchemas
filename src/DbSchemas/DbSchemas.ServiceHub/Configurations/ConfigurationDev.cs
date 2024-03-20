using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Configurations;

public class ConfigurationDev : ConfigurationProduction, IConfigs
{
    public override bool IsProduction => false;
}
