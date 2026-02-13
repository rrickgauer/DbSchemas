


export function tryParseInt(value: unknown): number | null
{
    try 
    {
        return parseInt(`${value}`);
    }
    catch (error)
    {
        return null;
    }
}


export function isValidEnumValue<T extends object>(enumObj: T, value: unknown): value is T[keyof T]
{
    return Object.values(enumObj)!.includes(value as T[keyof T]);
}


export function toDictionary<K extends keyof T, T extends object>(elements: T[], propertyKey: K): Map<T[K], T>
{
    const result = new Map<T[K], T>

    elements.forEach((element) =>
    {
        const key = element[propertyKey];
        result.set(key, element);
    });

    return result;
}

export function isObject(value: unknown): value is object
{
    return typeof value === "object" && value !== null;
}

export function isString(value: unknown): value is string
{
    return typeof value === "string" && value !== null;
}



