import { IpcRoutines } from "../../../../shared/domain/contracts/IpcRoutines";
import { IpcEventArgsFilterTableColumn } from "../../../../shared/domain/models/ipc-event-args/IpcEventArgs";
import { ShowAllOpenTableColumnsMessage, ConnectionsListRefreshMessage, FilterOpenTableColumnsMessage, RefreshPageMessage, ShowConnectionFormMessage } from "../../domain/messages/CustomMessages";
import { toastShowStandard } from "../toasts/ToastUtility";

//@ts-ignore
const IPC_SERVER = window.api as IpcRoutines;

export function ipcRegisterGuiEventHandlers(): void
{
    IPC_SERVER.onNewConnection(() =>
    {
        ShowConnectionFormMessage.invoke(this, {
            connectionId: null,
        });
    });

    IPC_SERVER.onRefreshConnections(() =>
    {
        RefreshPageMessage.invoke(this, null);
    });

    IPC_SERVER.onFilterTableColumn((data: IpcEventArgsFilterTableColumn) =>
    {
        FilterOpenTableColumnsMessage.invoke(this, data);
    });

    IPC_SERVER.onShowAllTableColumns(() =>
    {
        ShowAllOpenTableColumnsMessage.invoke(this, null);
    });
}


export async function ipcOpenFilePicker(): Promise<string | null>
{
    return await IPC_SERVER.openFilePicker();
}

