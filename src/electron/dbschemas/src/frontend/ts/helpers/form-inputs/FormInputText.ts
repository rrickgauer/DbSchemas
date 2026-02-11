import { getValueNullable } from "../../../../shared/utilities/nullable";
import { FormInput } from "./FormInput";


export class FormInputText extends FormInput<string | null>
{
    public override input: HTMLInputElement;

    public get value()
    {
        return getValueNullable(this.input.value, null);
    }

    public set value(value: string | null)
    {
        this.input.value = value ?? "";
    }

    public checkForValue(errorMessage?: string): this is FormInputText & { value: string; }
    {
        this.clearValidation();

        if (this.value)
        {
            return true;
        }

        if (errorMessage)
        {
            this.setInvalid(errorMessage);
        }

        return false;

    }
}
