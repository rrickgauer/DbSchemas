import { MessageBoxBase } from "./MessageBoxBase";
import { MessageBoxError } from "./MessageBoxError";
import { MessageBoxStandard } from "./MessageBoxStandard";
import { MessageBoxSucccess } from "./MessageBoxSucccess";
import { MessageBoxType } from "./MessageBoxType";


export type ShowMessageBoxData = {
    message: string;
    title?: string;
}

export function showMessageBoxStandard(message: ShowMessageBoxData)
{
    return show(message, MessageBoxType.STANDARD);
}

export function showMessageBoxSuccess(message: ShowMessageBoxData)
{
    return show(message, MessageBoxType.SUCCESS);
}

export function showMessageBoxError(message: ShowMessageBoxData)
{
    return show(message, MessageBoxType.ERROR);
}


export function show(message: ShowMessageBoxData, messageType: MessageBoxType): MessageBoxBase
{
    switch (messageType)
    {
        case MessageBoxType.STANDARD:
            return new MessageBoxStandard(message.message, message.title).show();

        case MessageBoxType.SUCCESS:
            return new MessageBoxSucccess(message.message, message.title).show();

        case MessageBoxType.ERROR:
            return new MessageBoxError(message.message, message.title).show();
    }

    throw new Error('Invalid message box type');
}
