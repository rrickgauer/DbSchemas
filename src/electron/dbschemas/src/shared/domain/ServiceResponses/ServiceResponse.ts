import { Nullable } from "../types/CustomTypes";
import { ServiceResponseBaseArgs } from "./ServiceResponseBase";
import { ServiceResponseBase } from "./ServiceResponseBase";

export type ServiceResponseArgs<T> = ServiceResponseBaseArgs & {
    data?: Nullable<T>;
}

export class ServiceResponse<T> extends ServiceResponseBase
{
    public data: T | null = null;

    constructor ();
    constructor (args: ServiceResponseArgs<T>);
    constructor (args?: ServiceResponseArgs<T>)
    {
        super({
            errorMessage: args?.errorMessage
        });

        this.data = args?.data ?? null;
    }
}
