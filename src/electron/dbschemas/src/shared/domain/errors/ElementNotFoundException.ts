

export class ElementNotFoundException extends Error {
    constructor(elementSelector: string) {
        super(`Could not find element: ${elementSelector}`);
    }

    public static throwIfNull(e: Element | null, selector?: string): void
    {
        if (!e) {
            selector ??= ``;
            throw new ElementNotFoundException(selector);
        }
    }
}
