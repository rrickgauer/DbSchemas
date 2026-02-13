

export type BootstrapComponentEventsArgs = {
    componentName: string;
    includeHidePrevented?: boolean;
}

export class BootstrapComponentEvents
{
    private readonly _componentName: string;

    public readonly hide: string;
    public readonly hidden: string;
    public readonly show: string;
    public readonly shown: string;
    public readonly hidePrevented: string | null;

    constructor (args: BootstrapComponentEventsArgs)
    {
        this._componentName = args.componentName;

        this.hide = `hide.bs.${this._componentName}`;
        this.hidden = `hidden.bs.${this._componentName}`;
        this.show = `show.bs.${this._componentName}`;
        this.shown = `shown.bs.${this._componentName}`;

        if (args.includeHidePrevented)
        {
            this.hidePrevented = `hidePrevented.bs.${this._componentName}`;
        }
        else
        {
            this.hidePrevented = null;
        }
    }
}
