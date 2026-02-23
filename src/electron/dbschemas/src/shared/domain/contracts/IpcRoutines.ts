import { IpcEventArgsFilterTableColumn } from "../models/ipc-event-args/IpcEventArgs";


export interface IpcRoutines
{
    onNewConnection(callback: () => void): void;
    onRefreshConnections(callback: () => void): void;
    onFilterTableColumn(callback: (data: IpcEventArgsFilterTableColumn) => void): void;
    onShowAllTableColumns(callback: () => void): void;

    openFilePicker(): Promise<string | null>;
}
