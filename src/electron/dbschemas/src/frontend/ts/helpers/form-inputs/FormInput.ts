import { domFocusInput, domGetClass, domGetClosestClass, domIsSpecificElement } from "../../utilities/DomUtility";

export type FormInputConstructor = new (element: Element) => FormInput<any>;

class FormInputElements
{
    public readonly formInputClass = 'form-input';
    public readonly invalidFeedbackClass = 'invalid-feedback';
    public readonly validFeedbackClass = 'valid-feedback';
    public readonly isInvalidClassName = 'is-invalid';
    public readonly isValidClassName = 'is-valid';
}

const ELE = new FormInputElements();

export abstract class FormInput<T>
{
    public abstract value: T;
    public input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
    public container: HTMLElement;
    private _invalidFeedback: HTMLDivElement;
    private _validFeedback: HTMLDivElement;
    
    constructor (e: Element)
    {
        this.container = domGetClosestClass<HTMLElement>(ELE.formInputClass, e);
        this.input = e as HTMLInputElement;
        this.container.insertAdjacentHTML("beforeend", `<div class="${ELE.invalidFeedbackClass}"></div>`);
        this.container.insertAdjacentHTML("beforeend", `<div class="${ELE.validFeedbackClass}"></div>`);
        this._invalidFeedback = domGetClass<HTMLDivElement>(ELE.invalidFeedbackClass, this.container);
        this._validFeedback = domGetClass<HTMLDivElement>(ELE.validFeedbackClass, this.container);
    }


    public setInvalid(): void;
    public setInvalid(message: string): void;
    public setInvalid(message: string, append: boolean): void;
    public setInvalid(message?: string, append?: boolean): void
    {
        if (append && message)
        {
            this._invalidFeedback.innerHTML += message;
        }
        else
        {
            this.clearValidation();
            this._invalidFeedback.innerHTML = message ?? "";
        }

        this.input.classList.add(ELE.isInvalidClassName);
    }

    public clearValidation(): void
    {
        this.input.classList.remove(ELE.isInvalidClassName);
        this.input.classList.remove(ELE.isValidClassName);
        this._invalidFeedback.innerText = '';
        this._validFeedback.innerText = '';
    }

    public focus()
    {
        if (!domIsSpecificElement(this.input, HTMLSelectElement))
        {
            domFocusInput(this.input);
        }
    }
}


