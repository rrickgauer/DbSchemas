
import { ArgumentException } from "../../../../shared/domain/errors/ArgumentException";
import { IDynamicOption } from "./IDynamicOption";


export class DynamicOption<T> implements IDynamicOption<T>
{
    public display: string;
    public value: T;

    constructor(display: string, value: T);
    constructor(option: IDynamicOption<T>);
    constructor(arg1: string | IDynamicOption<T>, arg2?: T)
    {
        if (typeof arg1 === "string" && arg2 !== undefined)
        {
            // Case: (display: string, value: T)
            this.display = arg1;
            this.value = arg2;
        }
        else if (typeof arg1 === "object" && arg1 !== null)
        {
            // Case: (option: IDynamicOption<T>)
            this.display = arg1.display;
            this.value = arg1.value;
        }

        else
        {
            throw new ArgumentException();
        }
    }

}
