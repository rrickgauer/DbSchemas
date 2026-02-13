import { MessageBoxBase } from "./MessageBoxBase";
import { MessageBoxType } from "./MessageBoxType";



export class MessageBoxError extends MessageBoxBase {
    public readonly messageBoxType = MessageBoxType.ERROR;
    protected defaultTitle = "Error";

    public get element() {
        return document.querySelector('#message-box-error') as HTMLDivElement;
    }

    constructor(message: string, title?: string) {
        super(message, title);
    }
}
