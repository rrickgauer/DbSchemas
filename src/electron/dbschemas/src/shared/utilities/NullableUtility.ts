
import { Nullable } from "../domain/types/CustomTypes";
import { isObject } from "./ConverterUtility";



export function setNullValues<T extends Record<string, any>>(data: T): T
{
    const keys = Object.keys(data) as (keyof T)[];

    for (const key of keys)
    {
        const value = data[key];

        if (isObject(value))
        {
            data[key] = setNullValues(value);
        } else
        {
            data[key] = getValueNullable(value)!;
        }
    }

    return data;
}


export function getValueNullable<T>(data: T, defaultValue: T | null = null): T | null
{
    return (notNull(data) ? data : defaultValue);
}



export function isNull<T>(data: T | null): data is Nullable<T>
{
    return !notNull<T>(data);
}


export function notNull<T>(data: T | null): data is NonNullable<T>
{
    if (data === null)
    {
        return false;
    }
    else if (typeof data === 'undefined')
    {
        return false;
    }
    else if (data === '')
    {
        return false;
    }

    return true;
}



