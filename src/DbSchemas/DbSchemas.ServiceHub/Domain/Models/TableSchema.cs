namespace DbSchemas.ServiceHub.Domain.Models;

public class TableSchema(string tableName)
{
    public string TableName { get; set; } = tableName;
    public List<ColumnDefinition> Columns { get; set; } = new();

    public TableSchema(string tableName, List<ColumnDefinition> columns) : this(tableName)
    {
        Columns = columns;
    }
}
