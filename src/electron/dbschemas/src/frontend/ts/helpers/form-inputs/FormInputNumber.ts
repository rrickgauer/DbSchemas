import { tryParseInt } from "../../../../shared/utilities/converters";
import { FormInput } from "./FormInput";


export class FormInputNumber extends FormInput<number | null>
{
    public override input: HTMLInputElement;

    public get value()
    {
        return tryParseInt(this.input.value);
    }

    public set value(value: number | null)
    {
        if (value)
        {
            this.input.value = `${value}`;
        }


        else
        {
            this.input.value = "";
        }
    }
}
