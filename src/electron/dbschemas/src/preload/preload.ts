import { contextBridge, ipcRenderer } from 'electron';
import { IPC_EVENT_NEW_CONNECTION, IPC_EVENT_OPEN_FILE_PICKER, IPC_EVENT_REFRESH_CONNECTIONS } from '../shared/domain/constants/IpcEventNames';

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

    onNewConnection: (callback) => ipcRenderer.on(IPC_EVENT_NEW_CONNECTION, (_event, value) => callback(value)),
    onRefreshConnections: (callback) => ipcRenderer.on(IPC_EVENT_REFRESH_CONNECTIONS, (_event, value) => callback(value)),

    /**
     * Example: generic invoke helper (optional)
     * Use sparingly.
     */
    invoke: <T = unknown>(channel: string, ...args: unknown[]): Promise<T> =>
    {
        return ipcRenderer.invoke(channel, ...args);
    },

    
    openFilePicker: () =>
    {
        return ipcRenderer.invoke(IPC_EVENT_OPEN_FILE_PICKER);
    },
});


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
