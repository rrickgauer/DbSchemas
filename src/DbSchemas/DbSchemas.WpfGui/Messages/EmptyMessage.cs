using CommunityToolkit.Mvvm.Messaging.Messages;
using System;

namespace DbSchemas.WpfGui.Messages;

public abstract class EmptyMessage : ValueChangedMessage<EventArgs>
{
    public EmptyMessage() : base(EventArgs.Empty) { }
}
