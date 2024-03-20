using DbSchemas.ServiceHub.Domain.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Domain.ColumnMappers;

public interface IColumnMapper
{
    public ColumnDefinition ToColumnDefinition(DataRow row);
    public IEnumerable<ColumnDefinition> ToColumnDefinitions(DataTable table) => table.AsEnumerable().Select(row => ToColumnDefinition(row));
}
