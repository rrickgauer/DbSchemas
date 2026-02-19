import { isNull } from "../../utilities/NullableUtility";
import { Nullable } from "../types/CustomTypes";

export type ServiceResponseBaseArgs = {
    errorMessage?: Nullable<string>;
};

export class ServiceResponseBase
{
    public errorMessage: string | null = null;

    constructor ();
    constructor (args: ServiceResponseBaseArgs);
    constructor (args?: ServiceResponseBaseArgs)
    {
        this.errorMessage = args?.errorMessage ?? null;
    }

    public hasError(): this is this & { errorMessage: string }
    {
        return this.errorMessage != null;
    }
}


