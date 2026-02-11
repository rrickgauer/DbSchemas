import { contextBridge, ipcRenderer } from 'electron';

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
  openDevTools: () => {
    ipcRenderer.send('devtools:open');
  },

  /**
   * Example: read app version from main
   */
  getAppVersion: async (): Promise<string> => {
    return ipcRenderer.invoke('app:get-version');
  },

  /**
   * Example: generic invoke helper (optional)
   * Use sparingly.
   */
  invoke: <T = unknown>(channel: string, ...args: unknown[]): Promise<T> => {
    return ipcRenderer.invoke(channel, ...args);
  }
});

/**
 * Lock down dangerous globals
 * (optional but recommended)
 */
window.addEventListener('DOMContentLoaded', () => {
  delete (window as any).require;
  delete (window as any).exports;
  delete (window as any).module;
});
