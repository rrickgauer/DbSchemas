import { MessageEventDetail } from "./MessageEventDetail";

export class CustomMessage<T>
{
    // ensures each message has a unique identifier
    public static CustomMessageIdCount = 0;

    protected readonly _id: number;

    protected readonly _body = document.querySelector('body') as HTMLBodyElement;

    protected get _eventName()
    {
        return `Custom-Message-${this._id}`;
    }

    constructor ()
    {
        CustomMessage.CustomMessageIdCount++;
        this._id = CustomMessage.CustomMessageIdCount;
    }

    public invoke(caller?: any, data?: T)
    {
        const detail = new MessageEventDetail<T>(caller, data);

        const customEvent = new CustomEvent(this._eventName, {
            detail: detail,
            bubbles: true,
            cancelable: true,
        });

        this._body.dispatchEvent(customEvent);
    }

    public addListener(callback: (event: MessageEventDetail<T>) => void)
    {
        const body = document.querySelector('body');

        this._body.addEventListener(this._eventName, (e: CustomEvent) =>
        {
            callback(e.detail);
        });
    }

    public removeListener = (callback: (event: MessageEventDetail<T>) => void) =>
    {
        const eventName = this.constructor.name;

        this._body.removeEventListener(eventName, (e: CustomEvent) =>
        {
            callback(e.detail);
        });
    };
}
