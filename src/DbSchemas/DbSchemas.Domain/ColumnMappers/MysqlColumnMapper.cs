using DbSchemas.Domain.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Domain.ColumnMappers;

public class MysqlColumnMapper : IColumnMapper
{

    public ColumnDefinition ToColumnDefinition(DataRow row)
    {
        throw new NotImplementedException();
    }
}
