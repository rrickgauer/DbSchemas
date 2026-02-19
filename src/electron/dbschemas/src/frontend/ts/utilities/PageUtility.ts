export function pageReady(callback: () => void)
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

export function refreshPage()
{
    window.location.href = window.location.href;
}