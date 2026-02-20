

export interface IpcRoutines
{
    onNewConnection(callback: () => void): void;
    onRefreshConnections(callback: () => void): void;

    openFilePicker(): Promise<string | null>;
}
