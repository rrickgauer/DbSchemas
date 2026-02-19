

export function urlGetPathValue(index: number): string | null;
export function urlGetPathValue(index: number, url: URL): string | null;
export function urlGetPathValue(index: number, url?: URL): string | null
{
    url ??= new URL(window.location.href);

    const pathValues = url.pathname.split('/').filter(v => v !== "");

    if (index > pathValues.length)
    {
        return null;
    }

    return pathValues[index];
}

export function urlReplacePath(newPath: string): URL;
export function urlReplacePath(newPath: string, url: string | URL): URL;
export function urlReplacePath(newPath: string, url?: string | URL): URL
{
    url ??= new URL(window.location.href);
    const result = (url instanceof URL) ? url : new URL(url);

    result.pathname = newPath;

    return result;
}

export function urlClearSearchParms(): URL;
export function urlClearSearchParms(url: URL): URL;
export function urlClearSearchParms(url?: URL): URL
{
    url ??= new URL(window.location.href);

    for(const key of url.searchParams.keys())
    {
        url.searchParams.delete(key);
    }

    return url;
}


export function urlToQueryParmString(data: object): string
{
    const urlParms = urlToSearchParams(data);
    return urlParms.toString();
}

export function urlToSearchParams(data: Record<any, any>): URLSearchParams
{
    const urlParms = new URLSearchParams();

    for (const key in data)
    {
        urlParms.set(key, `${data[key]}`);
    }

    return urlParms;
}




export function urlGetQueryParmValueNumber(key: string): number | null
{
    const stringValue = getUrlQueryParmValue(key);

    if (stringValue)
    {
        return parseInt(stringValue);
    }
    else
    {
        return null;
    }
}


export function urlHasQueryParm(key: string): boolean;
export function urlHasQueryParm(key: string, url: URL): boolean;
export function urlHasQueryParm(key: string, url?: URL): boolean
{
    return getUrlQueryParmValue(key, url ?? new URL(window.location.href)) !== null;
}

export function getUrlQueryParmValue(key: string): string | null;
export function getUrlQueryParmValue(key: string, url: URL): string | null;
export function getUrlQueryParmValue(key: string, url?: URL): string | null
{
    const currentUrl = url ?? new URL(window.location.href);
    return currentUrl.searchParams.get(key);
}

export function urlSetQueryParmQuiet(key: string, value: unknown)
{
    const url = new URL(window.location.href);

    url.searchParams.set(key, `${value}`);

    window.history.pushState({}, '', url);
}

export function urlRemoveQueryParmQuiet(key: string)
{
    const url = new URL(window.location.href);

    url.searchParams.delete(key);

    window.history.pushState({}, '', url);
}


export function urlReplacePathQuiet(newPath: string): URL;
export function urlReplacePathQuiet(newPath: string, url: URL): URL;
export function urlReplacePathQuiet(newPath: string, url?: URL): URL
{
    url ??= new URL(window.location.href);
    const newUrl = urlReplacePath(newPath, url);

    window.history.pushState({}, '', newUrl);

    return newUrl;
}

export function urlCreateFromSuffix(path: string): URL
{
    const prefix = window.location.origin;

    if (!path.startsWith('/'))
    {
        path = `/${path}`;
    }

    const uri = `${prefix}${path}`;
    return new URL(uri);
}
