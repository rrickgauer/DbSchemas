import { NativeEventClick } from "../../../../../shared/domain/constants/NativeEvents";
import { TableColumnsRequestData } from "../../../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { notNull } from "../../../../../shared/utilities/NullableUtility";
import { IController } from "../../../contracts/IController";
import { OpenTableCardClosedMessage } from "../../../domain/messages/CustomMessages";
import { TableServiceGui } from "../../../services/TableServiceGui";
import { TableListItemTemplate, TableListItemTemplateArgs, TableListItemTemplateElements } from "../../../templates/TableListItemTemplate";
import { domGetClass, domGetElementOrParentWithClassName } from "../../../utilities/DomUtility";
import { executeServiceCall } from "../../../utilities/ServiceUtility";
import { TablesListItem } from "./TablesListItem";

class TablesListElements
{
    public readonly listClass = `tables-list`;
    public readonly containerClass = `${this.listClass}-container`;
}

const ELE = new TablesListElements();
const ITEM = new TableListItemTemplateElements();

export class TablesList implements IController
{
    private _activeConnectionId: number = -1;
    private _container: HTMLDivElement;
    private _list: HTMLUListElement;
    private _tableService: TableServiceGui;
    private _htmlEngine: TableListItemTemplate;

    constructor()
    {
        this._container = domGetClass<HTMLDivElement>(ELE.containerClass);
        this._list = domGetClass<HTMLUListElement>(ELE.listClass, this._container);
        this._tableService = new TableServiceGui();
        this._htmlEngine = new TableListItemTemplate();
    }

    public control(): void
    {
        this.addListeners();
    }

    //#region - Event listeners -
    private addListeners(): void
    {
        this.addListItemClickListener();
        this.addOpenTableCardClosedMessageListener();
    }

    private addListItemClickListener()
    {
        this._container.addEventListener(NativeEventClick, (e) =>
        {
            const target = domGetElementOrParentWithClassName(e.target, ITEM.containerClass);
            if (target)
            {
                const listItem = new TablesListItem(target);
                listItem.openTable();
            }
        });
    }

    private addOpenTableCardClosedMessageListener()
    {
        OpenTableCardClosedMessage.addListener((message) =>
        {
            if (message.data == null)
            {
                console.assert(false, `Message data is null...`);
                return;
            }

            const table = this.getTable(message.data);
            if (table != null)
            {
                table.isActive = false;
            }
        });
    }
    //#endregion

    //#region - Show tables -
    public async showTables(connectionId: number): Promise<void>
    {
        this._activeConnectionId = connectionId;

        const tableNames = await this.getTables();
        if (notNull(tableNames))
        {
            this.displayTableNames(tableNames);
        }
    }

    private async getTables(): Promise<string[] | null>
    {
        return await executeServiceCall({
            callback: () => this._tableService.getConnectionTables(this._activeConnectionId),
            errorMessage: `Unable to fetch tables`,
        });
    }

    private displayTableNames(tableNames: string[]): void
    {
        const templateModels = this.getHtmlEngineModels(tableNames);
        const html = this._htmlEngine.toHtmls(templateModels);
        this._list.innerHTML = html;
    }

    private getHtmlEngineModels(tableNames: string[]): TableListItemTemplateArgs[]
    {
        return tableNames.map(name => ({
            connectionId: this._activeConnectionId,
            tableName: name,
        }));
    }
    //#endregion

    //#region - Misc -

    private getTable(tableInfo: TableColumnsRequestData): TablesListItem | null
    {
        const tables = this.getAllTables();
        const table = tables.find((t) => t.isSameTableColumnsRequestData(tableInfo));
        return table ?? null;
    }

    private getAllTables(): TablesListItem[]
    {
        const elements = Array.from(this._list.querySelectorAll<HTMLElement>(`.${ITEM.containerClass}`));
        const tableItems = elements.map((e) => new TablesListItem(e));
        return tableItems;
    }

    //#endregion
}



