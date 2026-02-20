import { IpcRoutines } from "../../../../shared/domain/contracts/IpcRoutines";
import { ConnectionsListRefreshMessage, RefreshPageMessage, ShowConnectionFormMessage } from "../../domain/messages/CustomMessages";

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
}


export async function ipcOpenFilePicker(): Promise<string | null>
{
    return await IPC_SERVER.openFilePicker();
}

