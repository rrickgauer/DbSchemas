import { FormInputConstructor } from "../helpers/form-inputs/FormInput";

export function domGetFormInputById<T extends FormInputConstructor>(id: string, instanceConstructor: T): InstanceType<T>
{
    const element = domGetId(id);
    return new instanceConstructor(element) as InstanceType<T>;
}

export function domGetClosestClass<T extends Element>(className: string, e: Element): T
{
    return e.closest<T>(`.${className}`)!;
}

export function domGetId<T extends Element>(id: string): T
{
    return domQuery<T>(`#${id}`);
}

export function domGetClass<T extends Element>(className: string): T;
export function domGetClass<T extends Element>(className: string, parent: Element): T;
export function domGetClass<T extends Element>(className: string, parent?: Element): T
{
    const top = parent ?? document;
    return domQuery<T>(`.${className}`, top as Element);
}

export function domQuery<T extends Element>(selector: string): T;
export function domQuery<T extends Element>(selector: string, parent: Element): T;
export function domQuery<T extends Element>(selector: string, parent?: Element): T
{
    const top = parent ?? document;
    return top.querySelector<T>(selector)!;
}


export function domGetClasses<T extends Element>(className: string): T[];
export function domGetClasses<T extends Element>(className: string, parent: Element): T[];
export function domGetClasses<T extends Element>(className: string, parent?: Element): T[]
{
    const top = parent ?? document;
    return domQueryAll<T>(`.${className}`, top as Element);
}

export function domQueryAll<T extends Element>(selector: string): T[];
export function domQueryAll<T extends Element>(selector: string, parent: Element): T[];
export function domQueryAll<T extends Element>(selector: string, parent?: Element): T[]
{
    const top = parent ?? document;
    return Array.from(top.querySelectorAll<T>(selector)!);
}


export function domIsElement(value: unknown | null): value is Element
{
    return value instanceof Element;
}

export function domEventTargetHasClass(event: Event, className: string): Element | null
{
    if (!domIsElement(event.target))
    {
        return null;
    }

    return event.target.classList.contains(className) ? event.target : null;
}

export function domIsHtmlElement(value: unknown): value is HTMLElement
{
    return domIsSpecificElement(value, HTMLElement);
}

export function domIsSpecificElement<T extends Element>(value: unknown, elementType: new (...args: any[]) => T): value is T
{
    return value instanceof elementType;
}

/**
 * Checks if the given value is an HTMLElement.
 * If true, it checks if the value or any of its parents has the specified class name.
 */
export function domGetElementOrParentWithClassName(value: unknown, className: string): HTMLElement | null
{
    if (!domIsHtmlElement(value))
    {
        return null;
    }

    return value.closest<HTMLElement>(`.${className}`);
}

export function domFocusInput(input: HTMLInputElement | HTMLTextAreaElement)
{
    const value = input.value;
    input.value = '';
    input.value = value;
    input.focus();
}