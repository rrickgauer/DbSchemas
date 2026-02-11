
export class MessageEventDetail<T>
{
    public caller?: any;
    public data: T | null;

    constructor (caller?: any, data?: T)
    {
        this.caller = caller;
        this.data = data ?? null;
    }
}
