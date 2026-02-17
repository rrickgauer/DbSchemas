import { SelectInput } from "../select-inputs/SelectInput";
import { FormInput } from "./FormInput";

export class FormInputSelect<T> extends FormInput<T | null>
{
    public override input: HTMLSelectElement;
    public selectInput: SelectInput<T>;

    constructor(e: HTMLSelectElement)
    {
        super(e);
        this.input = e;
        this.selectInput = new SelectInput<T>(e);
    }

    public get value()
    {
        return this.selectInput.currentOptionValue;
    }

    public set value(value: T | null)
    {
        this.selectInput.currentOptionValue = value;
    }
}

export class FormInputSelectNumber extends FormInputSelect<number>
{
    
}


