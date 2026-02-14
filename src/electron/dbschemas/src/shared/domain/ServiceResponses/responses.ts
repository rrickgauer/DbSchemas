import { isNull } from "../../utilities/nullable";
import { Nullable } from "../types/types";

type ServiceResponseBaseArgs = {
    errorMessage?: Nullable<string>;
}

type ServiceResponseArgs<T> = ServiceResponseBaseArgs & {
    data?: Nullable<T>;
}

export class ServiceResponseBase
{
    public errorMessage: string | null = null;
    public isSuccessful: boolean = true;

    constructor();
    constructor(args: ServiceResponseBaseArgs);
    constructor(args?: ServiceResponseBaseArgs)
    {
        this.errorMessage = args?.errorMessage ?? null;
        this.isSuccessful = isNull(this.errorMessage);
    }
}


export class ServiceResponse<T> extends ServiceResponseBase
{
    public data: T | null = null;

    constructor();
    constructor(args: ServiceResponseArgs<T>);
    constructor(args?: ServiceResponseArgs<T>)
    {
        super({
            errorMessage: args?.errorMessage
        });

        this.data = args?.data ?? null;
    }
}