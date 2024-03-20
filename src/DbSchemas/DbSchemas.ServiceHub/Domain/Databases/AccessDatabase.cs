using DbSchemas.ServiceHub.Domain.ColumnMappers;
using DbSchemas.ServiceHub.Domain.Records;
using System.Data.Common;

namespace DbSchemas.ServiceHub.Domain.Databases;


public class AccessDatabase(DatabaseConnectionRecord databaseConnectionRecord) : IDatabase
{
    public DatabaseConnectionRecord DatabaseConnectionRecord { get; } = databaseConnectionRecord;

    public string ConnectionString
    {
        get
        {
            DbConnectionStringBuilder builder = new()
            {
                { "Provider", "Microsoft.ACE.OLEDB.12.0" }
            };

            if (!string.IsNullOrWhiteSpace(DatabaseConnectionRecord.File))
            {
                builder.Add("Data Source", DatabaseConnectionRecord.File);
            }

            builder.Add("OLE DB Services", -2);        // No pooling services

            if (!string.IsNullOrWhiteSpace(DatabaseConnectionRecord.Password))
            {
                builder.Add("Jet OLEDB:Database Password", DatabaseConnectionRecord.Password);
            }

            return builder.ConnectionString;
        }
    }

    public IColumnMapper ColumnMapper => new AccessColumnMapper();
}
