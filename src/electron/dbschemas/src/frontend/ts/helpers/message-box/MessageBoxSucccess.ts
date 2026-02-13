import { MessageBoxBase } from "./MessageBoxBase";
import { MessageBoxType } from "./MessageBoxType";



export class MessageBoxSucccess extends MessageBoxBase {
    public readonly messageBoxType = MessageBoxType.SUCCESS;
    protected defaultTitle = "Success";

    public get element() {
        return document.querySelector('#message-box-success') as HTMLDivElement;
    }

    constructor(message: string, title?: string) {
        super(message, title);
    }
}
