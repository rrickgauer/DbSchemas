import { BrowserWindow, ipcMain, IpcMain, IpcMainInvokeEvent } from "electron";
import { IPC_EVENT_OPEN_FILE_PICKER } from "../../shared/domain/constants/IpcEventNames";
import { osOpenFilePicker } from "./OperatingSystem";


type IpcHandlerArgs = {
    // window: BrowserWindow;
    // ipcMain: IpcMain;
}


export class IpcHandlers
{
    private _ipcMain: IpcMain;

    constructor(args: IpcHandlerArgs)
    {
        this._ipcMain = ipcMain;
    }

    public addInboundMessageHandlers(): void
    {
        this.addListener_OpenFilePicker();
    }

    private addListener_OpenFilePicker(): void
    {
        this._ipcMain.handle(IPC_EVENT_OPEN_FILE_PICKER, async (event) =>
        {
            const window = this.getWindowFromEvent(event);
            return await osOpenFilePicker(window);
        });
    }

    private getWindowFromEvent(event: IpcMainInvokeEvent): BrowserWindow | null
    {
        const browserWindow = BrowserWindow.fromWebContents(event.sender);

        console.assert(browserWindow != null, `Unable to retrieve BrowserWindow from IpcMainInvokeEvent`);

        return browserWindow;
    }
}



