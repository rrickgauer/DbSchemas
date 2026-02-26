import { TableColumnsRequestData } from "../../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { IpcEventArgsFilterTableColumn } from "../../../../shared/domain/models/ipc-event-args/IpcEventArgs";
import { CustomEmptyMessage } from "../../helpers/messages/CustomEmptyMessage";
import { CustomMessage } from "../../helpers/messages/CustomMessage";

//#region - Connections List -

export const ConnectionsListRefreshMessage = new CustomEmptyMessage();
export const RefreshPageMessage = new CustomEmptyMessage();

type ShowConnectionFormMessageArgs = {
    connectionId?: number | null;
}
export const ShowConnectionFormMessage = new CustomMessage<ShowConnectionFormMessageArgs>();



type TableSidebarListItemClickedMessageArgs = {
    tableRequestData: TableColumnsRequestData;
    isActive: boolean;
}

export const TableSidebarListItemClickedMessage = new CustomMessage<TableSidebarListItemClickedMessageArgs>();

export const ConnectionDeletedMessage = new CustomMessage<number>();

//#endregion

//#region - Open Table Cards -

export const OpenTableCardClosedMessage = new CustomMessage<TableColumnsRequestData>();

//#endregion

export const FilterOpenTableColumnsMessage = new CustomMessage<IpcEventArgsFilterTableColumn>();
export const ShowAllOpenTableColumnsMessage = new CustomEmptyMessage();

export const ShowSearchModalMessage = new CustomEmptyMessage();

export const CopyAllOpenTablesMessage = new CustomEmptyMessage();
export const CloseAllOpenTablesMessage = new CustomEmptyMessage();
