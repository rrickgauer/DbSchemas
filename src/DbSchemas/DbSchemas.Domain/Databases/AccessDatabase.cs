using DbSchemas.Domain.ColumnMappers;
using DbSchemas.Domain.Records;
using System.Data.Common;

namespace DbSchemas.Domain.Databases;


public class AccessDatabase : IDatabase
{
    public DatabaseConnectionRecord DatabaseConnectionRecord { get; }

    public string ConnectionString
    {
        get
        {
            DbConnectionStringBuilder builder = new();
            
            builder.Add("Provider", "Microsoft.ACE.OLEDB.12.0");
            
            builder.Add("Data Source", DatabaseConnectionRecord.File);

            builder.Add("OLE DB Services", -2);        // No pooling services
            
            if (!string.IsNullOrWhiteSpace(DatabaseConnectionRecord.Password))
            {
                builder.Add("Jet OLEDB:Database Password", DatabaseConnectionRecord.Password);
            }
            
            return builder.ConnectionString;
        }
    }

    public IColumnMapper ColumnMapper => new AccessColumnMapper();

    public AccessDatabase(DatabaseConnectionRecord databaseConnectionRecord)
    {
        DatabaseConnectionRecord = databaseConnectionRecord;
    }
}
