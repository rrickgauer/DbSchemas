import { TableColumnsRequestData } from "../../../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { TableDefinitionModel } from "../../../../../shared/domain/models/table-definitions/TableDefinitionModel";
import { OpenTableCardTemplate, OpenTableCardTemplateElements } from "../../../templates/open-tables/OpenTableCardTemplate";
import { domGetClasses } from "../../../utilities/DomUtility";
import { OpenTablesCardItem } from "./OpenTablesCardItem";

const CARD_ELEMENTS = new OpenTableCardTemplateElements();

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