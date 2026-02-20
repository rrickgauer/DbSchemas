import { TableColumnsRequestData } from "../../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { IpcEventArgsFilterTableColumn } from "../../../../shared/domain/models/ipc-event-args/IpcEventArgs";


export type SessionData = {
    openTables: TableColumnsRequestData[];
    isSidebarOpen: boolean;
    visibleOpenTableColumns: IpcEventArgsFilterTableColumn[];
};
