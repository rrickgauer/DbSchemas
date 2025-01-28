using CommunityToolkit.Mvvm.Messaging.Messages;
using DbSchemas.ServiceHub.Domain.Models;

namespace DbSchemas.WpfGui.Messages;

public sealed class CloseOpenTableSchemaMessage : ValueChangedMessage<TableSchema>
{
    public CloseOpenTableSchemaMessage(TableSchema value) : base(value) { }
}
