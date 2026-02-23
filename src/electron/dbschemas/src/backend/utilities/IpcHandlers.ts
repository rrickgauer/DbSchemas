import { BrowserWindow, ipcMain, IpcMain, IpcMainInvokeEvent } from "electron";
import { IPC_EVENT_OPEN_FILE_PICKER } from "../../shared/domain/constants/IpcEventNames";
import { osOpenFilePicker } from "./OperatingSystem";

export function ipcAddInboundMessageHandlers(): void
{
    addListener_OpenFilePicker();
}

function addListener_OpenFilePicker(): void
{
    ipcMain.handle(IPC_EVENT_OPEN_FILE_PICKER, async (event) =>
    {
        const window = getWindowFromEvent(event);
        return await osOpenFilePicker(window);
    });
}

function getWindowFromEvent(event: IpcMainInvokeEvent): BrowserWindow | null
{
    const browserWindow = BrowserWindow.fromWebContents(event.sender);

    console.assert(browserWindow != null, `Unable to retrieve BrowserWindow from IpcMainInvokeEvent`);

    return browserWindow;
}


export function ipcSendMessageToFrontEnd(window: BrowserWindow, message: string, ...args: any[]): void
{
    window.webContents.send(message, ...args);
}

function getCurrentBrowserWindow(): BrowserWindow
{
    return BrowserWindow.getAllWindows()[0];
}





