import { contextBridge, IpcRenderer, ipcRenderer } from 'electron';
import * as ipcEvents from '../shared/domain/constants/IpcEventNames';

/**
 * Everything exposed here becomes available on `window.api`
 * in the renderer process.
 *
 * Keep this SMALL and SAFE.
 */
contextBridge.exposeInMainWorld('api', {
    /**
     * Example: open dev tools (useful during development)
     */
    openDevTools: () =>
    {
        ipcRenderer.send('devtools:open');
    },

    /**
     * Example: read app version from main
     */
    getAppVersion: async (): Promise<string> =>
    {
        return ipcRenderer.invoke('app:get-version');
    },

    /**
     * Example: generic invoke helper (optional)
     * Use sparingly.
     */
    invoke: <T = unknown>(channel: string, ...args: unknown[]): Promise<T> =>
    {
        return ipcRenderer.invoke(channel, ...args);
    },

    /********************************************************************
    The frontend can call these methods with the window.api:

        window.api.onNewConnection((args) => {
            console.log(args);
        });

        window.api.openFilePicker();
    *********************************************************************/
    // Backend -> Frontend
    onNewConnection: (callback: ipcCallback) => registerBasicCallback(ipcEvents.IPC_EVENT_NEW_CONNECTION, callback),
    onRefreshConnections: (callback: ipcCallback) => registerBasicCallback(ipcEvents.IPC_EVENT_REFRESH_CONNECTIONS, callback),
    onFilterTableColumn: (callback: ipcCallback) => registerBasicCallback(ipcEvents.IPC_EVENT_TOGGLE_TABLE_COLUMN, callback),
    onShowAllTableColumns: (callback: ipcCallback) => registerBasicCallback(ipcEvents.IPC_EVENT_SHOW_ALL_TABLE_COLUMNS, callback),
    onSearch: (callback: ipcCallback) => registerBasicCallback(ipcEvents.IPC_EVENT_FIND, callback),

    // Frontend -> Backend
    openFilePicker: () => ipcRenderer.invoke(ipcEvents.IPC_EVENT_OPEN_FILE_PICKER),
    getFilterTableColumns: () => ipcRenderer.invoke(ipcEvents.IPC_EVENT_GET_FILTER_COLUMNS),
});


type ipcCallback = (event: Electron.IpcRendererEvent, ...args: any[]) => void;

function registerBasicCallback(eventName: string, callback: ipcCallback): IpcRenderer
{
    return ipcRenderer.on(eventName, (_event, value) => callback(value));
}


/**
 * Lock down dangerous globals
 * (optional but recommended)
 */
window.addEventListener('DOMContentLoaded', () =>
{
    delete (window as any).require;
    delete (window as any).exports;
    delete (window as any).module;
});
