import { getValueNullable } from "../../../../shared/utilities/NullableUtility";
import { FormInput } from "./FormInput";


export class FormInputTextArea extends FormInput<string | null>
{
    public override input: HTMLTextAreaElement;

    public get value()
    {
        return getValueNullable(this.input.value, null);
    }

    public set value(value: string | null)
    {
        this.input.value = value ?? "";
    }


    public checkForValue(errorMessage?: string): this is FormInputTextArea & { value: string; }
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
