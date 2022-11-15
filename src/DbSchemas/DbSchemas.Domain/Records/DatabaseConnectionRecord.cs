/*******************************************************************************

This represents a record in the user's program database for database connections.

********************************************************************************/

using DbSchemas.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Domain.Records;

public class DatabaseConnectionRecord
{
    public long? Id { get; set; }
    public string? Name { get; set; }
    public DatabaseType DatabaseType { get; set; } = DatabaseType.MySql;
    public string? DatabaseName { get; set; }
    public string? Username { get; set; }
    public string? Host { get; set; }
    public string? Password { get; set; }
    public string? File { get; set; }
    public DateTime? CreatedOn { get; set; } = DateTime.Now;
}
