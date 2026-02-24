import { TableColumnsRequestData } from "../../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { TableDefinitionModel } from "../../../../shared/domain/models/table-definitions/TableDefinitionModel";
import { ConnectionSidebarListItemTemplateElements } from "../../templates/connections-sidebar/ConnectionSidebarListItemTemplate";
import { TableSidebarListItemTemplateElements } from "../../templates/connections-sidebar/TableSidebarListItemTemplate";
import { OpenTableCardTemplateElements, OpenTableCardTemplate } from "../../templates/open-tables/OpenTableCardTemplate";
import { domGetClasses } from "../../utilities/DomUtility";
import { OpenTablesCardItem } from "./open-tables/OpenTablesCardItem";
import { SidebarConnectionListItem } from "./sidebar/SidebarConnectionListItem";
import { SidebarTableListItem } from "./sidebar/SidebarTableListItem";

const CARD_ELEMENTS = new OpenTableCardTemplateElements();
const SIDEBAR_TABLE = new TableSidebarListItemTemplateElements();
const SIDEBAR_CONNECTION = new ConnectionSidebarListItemTemplateElements();

export function createEmptyOpenTablesCardItem(tableData: TableColumnsRequestData, container: Element): OpenTablesCardItem
{
    const blankTableDefinition = new TableDefinitionModel();
    blankTableDefinition.columns = [];
    blankTableDefinition.connectionId = tableData.connectionId;
    blankTableDefinition.tableName = tableData.tableName;

    const htmlEngine = new OpenTableCardTemplate();
    const html = htmlEngine.toHtml(blankTableDefinition);
    container.insertAdjacentHTML("beforeend", html);

    const cardItem = getOpenTablesCardItem(tableData)!;
    cardItem.isSpinnerVisible = true;
    return cardItem;
}

export function getOpenTablesCardItem(tableInfo: TableColumnsRequestData): OpenTablesCardItem | null
{
    const items = getAllOpenTableCardItems();
    const match = items.find((i) => i.isEqual(tableInfo));
    return match ?? null;
}

export function getAllOpenTableCardItems(): OpenTablesCardItem[]
{
    const elements = domGetClasses<HTMLElement>(CARD_ELEMENTS.containerClass);
    const cardItems = elements.map((e) => new OpenTablesCardItem(e));
    return cardItems;
}

export function getAllSidebarTableListItems(): SidebarTableListItem[]
{
    const elements = domGetClasses<HTMLElement>(SIDEBAR_TABLE.containerClass);
    return elements.map(e => new SidebarTableListItem(e));
}


export function getSidebarConnectionNameMap(): Map<number, string>
{
    const result = new Map<number, string>();

    const connections = getAllSidebarConnectionListItems();

    for (const connection of connections)
    {
        result.set(connection.connectionId, connection.connectionName);
    }

    return result;
}

export function getAllSidebarConnectionListItems(): SidebarConnectionListItem[]
{
    const elements = domGetClasses<HTMLElement>(SIDEBAR_CONNECTION.containerClass);
    return elements.map(e => new SidebarConnectionListItem(e));
}