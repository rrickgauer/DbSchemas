import { MessageBoxBase } from "./MessageBoxBase";
import { MessageBoxType } from "./MessageBoxType";



export class MessageBoxStandard extends MessageBoxBase {
    public readonly messageBoxType = MessageBoxType.STANDARD;
    protected defaultTitle = "Details";

    public get element() {
        return document.querySelector('#message-box-standard') as HTMLDivElement;
    }

    constructor(message: string, title?: string) {
        super(message, title);
    }


}
