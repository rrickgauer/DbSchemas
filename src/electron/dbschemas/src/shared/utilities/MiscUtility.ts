
export function getValueDefault<T>(value: unknown | null, defaultValue: T): T
{
    if (value == null)
    {
        return defaultValue;
    }

    return value as T;
}