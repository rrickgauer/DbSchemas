import { BrowserWindow, ipcMain, IpcMainInvokeEvent } from "electron";
import { IPC_EVENT_GET_FILTER_COLUMNS, IPC_EVENT_OPEN_FILE_PICKER } from "../../shared/domain/constants/IpcEventNames";
import { osOpenFilePicker } from "./OperatingSystem";
import { getCurrentFilterTableColumnMenuItems } from "../helpers/application-menu/ApplicationMenuUtility";

export function ipcAddInboundMessageHandlers(): void
{
    addListener_GetFilterColumns();
    addListener_OpenFilePicker();
}

function addListener_GetFilterColumns(): void
{
    ipcMain.handle(IPC_EVENT_GET_FILTER_COLUMNS, async (e) =>
    {
        return getCurrentFilterTableColumnMenuItems();
    });
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
