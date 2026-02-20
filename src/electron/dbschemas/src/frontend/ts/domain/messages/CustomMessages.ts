import { TableColumnsRequestData } from "../../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { CustomEmptyMessage } from "../../helpers/messages/CustomEmptyMessage";
import { CustomMessage } from "../../helpers/messages/CustomMessage";

//#region - Connections List -

export const ConnectionsListRefreshMessage = new CustomEmptyMessage();

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


