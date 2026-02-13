import { IDynamicOption } from "../select-inputs/IDynamicOption";

export class SelectInput<T>
{
    public readonly element: HTMLSelectElement;

    public get currentOptionValue(): T | null
    {
        return this.currentOptionElement?.value as T ?? null;
    }

    public set currentOptionValue(value: T | null)
    {
        if (value === null)
        {
            this.element.selectedIndex = -1;
            return;
        }

        const option = this.element.querySelector<HTMLOptionElement>(`option[value="${value}"]`);

        if (option)
        {
            option.selected = true;
        }
    }

    public get currentOptionElement(): HTMLOptionElement | null
    {
        return this.element.selectedOptions[0];
    }

    public get currentOptionText(): string | null
    {
        return this.currentOptionElement?.innerText ?? null;
    }

    public set currentOptionText(value: string)
    {
        if (this.currentOptionElement)
        {
            this.currentOptionElement.innerText = value;
        }
    }

    constructor(selectElement: HTMLSelectElement)
    {
        this.element = selectElement;
    }


    public append(optionHtml: string)
    {
        this.element.insertAdjacentHTML("beforeend", optionHtml);
    }

    public setOptions(options: IDynamicOption<T>[])
    {
        const html = options.map(o => `<option value="${o.value}">${o.display}</option>`).join('');

        this.element.innerHTML = html;
    }
}




