import { TableColumnsRequestData } from "../../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { CustomEmptyMessage } from "../../helpers/messages/CustomEmptyMessage";
import { CustomMessage } from "../../helpers/messages/CustomMessage";

//#region - Connections List -

export const ConnectionsListRefreshMessage = new CustomEmptyMessage();

export const ShowConnectionFormMessage = new CustomMessage<{
    connectionId?: number | null;
}>();

//#endregion


//#region - Tables Sidebar List -

export const TableSidebarListItemClickedMessage = new CustomMessage<{
    tableRequestData: TableColumnsRequestData;
    isActive: boolean;
}>();

//#endregion

//#region - Open Table Cards -

export const OpenTableCardClosedMessage = new CustomMessage<TableColumnsRequestData>();

//#endregion


