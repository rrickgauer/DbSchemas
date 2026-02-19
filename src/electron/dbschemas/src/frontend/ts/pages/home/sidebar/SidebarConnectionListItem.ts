import { ConnectionType } from "../../../../../shared/domain/enums/ConnectionType";
import { TableServiceGui } from "../../../services/TableServiceGui";
import { ConnectionSidebarListItemTemplateElements } from "../../../templates/connections-sidebar/ConnectionSidebarListItemTemplate";
import { TableSidebarListItemTemplate } from "../../../templates/connections-sidebar/TableSidebarListItemTemplate";
import { domGetClass, domGetClosestClass } from "../../../utilities/DomUtility";
import { executeServiceCall } from "../../../utilities/ServiceUtility";

const ELE = new ConnectionSidebarListItemTemplateElements();

export class SidebarConnectionListItem
{
    private _container: HTMLLIElement;
    private _tableService: TableServiceGui;
    private _tablesList: HTMLUListElement;

    public get connectionType(): ConnectionType
    {
        return parseInt(this._container.getAttribute(ELE.connectionTypeAttr)!);
    }

    public get connectionId(): number
    {
        return parseInt(this._container.getAttribute(ELE.connnectionIdAttr)!);
    }

    constructor(e: Element)
    {
        this._container = domGetClosestClass<HTMLLIElement>(ELE.containerClass, e);
        this._tableService = new TableServiceGui();
        this._tablesList = domGetClass<HTMLUListElement>(ELE.tablesListClass, this._container);
    }

    public async refreshTables(): Promise<void>
    {
        if (this.connectionType != ConnectionType.Postgres)
        {
            return;
        }

        const tableNames = await this.getTableNamesFromApi();

        if (tableNames)
        {
            this.setTablesListHtml(tableNames);
        }
    }


    private async getTableNamesFromApi(): Promise<string[] | null>
    {
        return await executeServiceCall({
            callback: () => this._tableService.getConnectionTables(this.connectionId),
            errorMessage: `Unable to fetch connection tables`,
        });
    }

    private setTablesListHtml(tableNames: string[]): void
    {
        const htmlEngine = new TableSidebarListItemTemplate();
        const html = htmlEngine.toHtmls(tableNames.map(t => ({
            connectionId: this.connectionId,
            tableName: t,
        })));

        this._tablesList.innerHTML = html;
    }
}
