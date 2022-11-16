using DbSchemas.Domain.ColumnMappers;
using DbSchemas.Domain.Models;
using DbSchemas.Domain.Records;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Domain.Databases;

public interface IDatabase
{
    public DatabaseConnectionRecord DatabaseConnectionRecord { get; }
    public string ConnectionString { get; }
    public IColumnMapper ColumnMapper { get; }
}
