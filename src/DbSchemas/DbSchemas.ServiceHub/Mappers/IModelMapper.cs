using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.ServiceHub.Mappers;

public interface IModelMapper<T>
{
    T ToModel(DataRow dataRow);
    IEnumerable<T> ToModels(DataTable dataTable) => dataTable.AsEnumerable().Select(row => ToModel(row));
}
