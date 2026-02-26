import { ConnectionType } from "../../../../../shared/domain/enums/ConnectionType";
import { ConnectionDeletedMessage, ShowConnectionFormMessage } from "../../../domain/messages/CustomMessages";
import { toastShowSuccess } from "../../../helpers/toasts/ToastUtility";
import { ConnectionsServiceGui } from "../../../services/ConnectionsServiceGui";
import { TableServiceGui } from "../../../services/TableServiceGui";
import { ConnectionSidebarListItemTemplateElements } from "../../../templates/connections-sidebar/ConnectionSidebarListItemTemplate";
import { TableSidebarListItemTemplate } from "../../../templates/connections-sidebar/TableSidebarListItemTemplate";
import { bootstrapHideElement, bootstrapShowCollapse, bootstrapShowElement } from "../../../utilities/BootstrapUtility";
import { domGetClass, domGetClosestClass } from "../../../utilities/DomUtility";
import { executeServiceCall } from "../../../utilities/ServiceUtility";

const ELE = new ConnectionSidebarListItemTemplateElements();

export class SidebarConnectionListItem
{
    private _container: HTMLLIElement;
    private _tableService: TableServiceGui;
    private _tablesList: HTMLUListElement;
    private _connectionService: ConnectionsServiceGui;
    private _collapseContainer: HTMLDivElement;

    public get connectionType(): ConnectionType
    {
        return parseInt(this._container.getAttribute(ELE.connectionTypeAttr)!);
    }

    public get connectionId(): number
    {
        return parseInt(this._container.getAttribute(ELE.connnectionIdAttr)!);
    }

    public get connectionName(): string
    {
        return domGetClass<HTMLButtonElement>(ELE.btnToggleClass, this._container).innerText;
    }

    constructor (e: Element)
    {
        this._container = domGetClosestClass<HTMLLIElement>(ELE.containerClass, e);
        this._tableService = new TableServiceGui();
        this._tablesList = domGetClass<HTMLUListElement>(ELE.tablesListClass, this._container);
        this._connectionService = new ConnectionsServiceGui();
        this._collapseContainer = domGetClass<HTMLDivElement>(ELE.tablesContainerClass, this._container);
    }


    public editConnection(): void
    {
        // opent the connection form modal
        ShowConnectionFormMessage.invoke(this, {
            connectionId: this.connectionId,
        });
    }

    public expand(): void
    {
        bootstrapShowCollapse(this._collapseContainer);
    }

    //#region - Refresh tables -
    public async refreshTables(): Promise<void>
    {
        switch(this.connectionType)
        {
            case ConnectionType.MySQL:
            case ConnectionType.Access:
                console.assert(false, `Can't retrieve columns for this type`);
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
    //#endregion


    //#region - Delete connection -
    public async deleteConnection(): Promise<void>
    {
        if (!this.confirmDelete())
        {
            return;
        }

        bootstrapHideElement(this._container);

        const isDeleted = await this.sendApiDeleteRequest();
        if (!isDeleted)
        {
            bootstrapShowElement(this._container);
            return;
        }

        ConnectionDeletedMessage.invoke(this, this.connectionId);

        this._container.remove();

        toastShowSuccess({
            message: `Connection deleted`,
        });
    }

    private confirmDelete(): boolean
    {
        return confirm(`Are you sure you want to delete this connection?`)
    }

    private async sendApiDeleteRequest(): Promise<boolean>
    {
        const response = await executeServiceCall({
            callback: () => this._connectionService.deleteConnection(this.connectionId),
            errorMessage: `Connection not deleted`,
        });

        if (response == null)
        {
            return false;
        }

        return !response.hasError();
    }

    //#endregion
}
