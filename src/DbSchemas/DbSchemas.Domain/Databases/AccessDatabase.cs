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
            
            string dbPath = @"C:\Users\1\Desktop\AP0STE.mdb";
            builder.Add("Data Source", dbPath);
            builder.Add("OLE DB Services", -2);        // No pooling services
            builder.Add("Jet OLEDB:Database Password", "sailboat");



            return builder.ConnectionString;
        }
    }

    public IColumnMapper ColumnMapper => new AccessColumnMapper();

    public AccessDatabase(DatabaseConnectionRecord databaseConnectionRecord)
    {
        DatabaseConnectionRecord = databaseConnectionRecord;
    }
}
