import { DateTime } from "luxon";
import { datesParse } from "../../../../shared/utilities/dates";
import { notNull } from "../../../../shared/utilities/nullable";
import { FormInput } from "./FormInput";


export class FormInputDate extends FormInput<DateTime | null>
{
    public override input: HTMLInputElement;

    public get value(): DateTime | null
    {
        return notNull(this.input.value) ? datesParse(this.input.value) : null;
    }

    public set value(value: DateTime | null)
    {
        this.input.value = value?.toISODate() ?? "";
    }

    public checkForValue(errorMessage?: string): this is FormInputDate & { value: DateTime; }
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
