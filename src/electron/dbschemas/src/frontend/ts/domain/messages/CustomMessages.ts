import { CustomEmptyMessage } from "../../helpers/messages/CustomEmptyMessage";
import { CustomMessage } from "../../helpers/messages/CustomMessage";

//#region - Connections List -

export const ConnectionsListRefreshMessage = new CustomEmptyMessage();

export const ShowConnectionFormMessage = new CustomMessage<{
    connectionId?: number | null;
}>();

//#endregion

