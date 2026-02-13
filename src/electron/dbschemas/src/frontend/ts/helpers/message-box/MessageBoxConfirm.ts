
import { NativeEventClick } from "../../../../shared/domain/constants/native-events";
import { BootstrapModalEvents } from "../../domain/bootstrap/events/bootstrap-events";
import { MessageBoxBase } from "./MessageBoxBase";
import { MessageBoxType } from "./MessageBoxType";

export type MessageBoxConfirmArgs = {
    onSuccess?: () => void;
    //onCancel?: () => void;
}


export class MessageBoxConfirm extends MessageBoxBase
{
    public readonly messageBoxType = MessageBoxType.ERROR;
    protected defaultTitle = "Confirm";

    private readonly _defaultConfirmButtonText = "Confirm";
    private readonly _btnConfirm: HTMLButtonElement;

    private onSuccess?: () => void;

    public get element()
    {
        return document.querySelector<HTMLDivElement>('#message-box-confirm')!;
    }

    constructor (message: string, confirmButtonText?: string, title?: string)
    {
        super(message, title);

        this._btnConfirm = this.element.querySelector('[data-js-confirm]') as HTMLButtonElement;
        this._btnConfirm.innerText = confirmButtonText ?? this._defaultConfirmButtonText;

        this.element.addEventListener(BootstrapModalEvents.hidden, () =>
        {
            this._btnConfirm.removeEventListener(NativeEventClick, this.clickHandler);
        });
    }

    public confirm = (args: MessageBoxConfirmArgs) =>
    {
        this.onSuccess = args.onSuccess;
        this.show();
        this._btnConfirm.addEventListener(NativeEventClick, this.clickHandler);
    };

    private clickHandler = (e) =>
    {
        e.preventDefault();

        if (this.onSuccess)
        {
            this.onSuccess();
        }

        // Remove the click event listener
        this._btnConfirm.removeEventListener(NativeEventClick, this.clickHandler);

        this.close();
    };


}
