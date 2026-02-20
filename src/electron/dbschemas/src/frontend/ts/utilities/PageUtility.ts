import { bootstrapHideElement, bootstrapShowElement } from "./BootstrapUtility";
import { domGetClass } from "./DomUtility";

export function pageOnReady(callback: () => void)
{
    if (document.readyState !== 'loading')
    {
        callback();
    }
    else
    {
        //document.addEventListener('DOMContentLoaded', callback);
        document.addEventListener('DOMContentLoaded', () =>
        {
            callback();
        });
    }
}

export function pageRefresh()
{
    window.location.href = window.location.href;
}


const PAGE_LOADING_CLASS = `loading-screen`;

export function pageHideLoadingScreen(): void
{
    const element = document.querySelector<HTMLElement>(`.${PAGE_LOADING_CLASS}`);
    if (element)
    {
        bootstrapHideElement(element);
    }
}

export function pageShowLoadingScreen(): void
{
    const element = document.querySelector<HTMLElement>(`.${PAGE_LOADING_CLASS}`);
    if (element)
    {
        bootstrapShowElement(element);
    }
}


