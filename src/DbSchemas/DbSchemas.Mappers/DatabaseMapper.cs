using DbSchemas.Domain.Enums;
using DbSchemas.Domain.Records;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSchemas.Mappers;

public class DatabaseMapper : IModelMapper<DatabaseConnectionRecord>
{
    public DatabaseConnectionRecord ToModel(DataRow dataRow)
    {
        DatabaseConnectionRecord database = new()
        {
            Id = dataRow.Field<long?>("id"),
            Name = dataRow.Field<string>("name"),
            DatabaseName = dataRow.Field<string>("database_name"),
            Username = dataRow.Field<string>("username"),
            Host = dataRow.Field<string>("host"),
            Password = dataRow.Field<string>("password"),
            File = dataRow.Field<string>("file"),
            CreatedOn = MapperUtilities.ParseDateTime(dataRow, "created_on"),
            DatabaseType = (DatabaseType)dataRow.Field<long>("database_type_id")
        };

        return database;
    }
}
