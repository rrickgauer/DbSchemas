import { NativeEventClick } from "../../../../../shared/domain/constants/NativeEvents";
import { TableColumnsRequestData } from "../../../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { ConnectionModel } from "../../../../../shared/domain/models/connections/ConnectionModel";
import { notNull } from "../../../../../shared/utilities/NullableUtility";
import { IControllerAsync } from "../../../contracts/IController";
import { OpenTableCardClosedMessage } from "../../../domain/messages/CustomMessages";
import { ConnectionsServiceGui } from "../../../services/ConnectionsServiceGui";
import { ConnectionSidebarListItemTemplate, ConnectionSidebarListItemTemplateElements } from "../../../templates/connections-sidebar/ConnectionSidebarListItemTemplate";
import { TableSidebarListItemTemplateElements } from "../../../templates/connections-sidebar/TableSidebarListItemTemplate";
import { bootstrapHideElement, bootstrapShowElement } from "../../../utilities/BootstrapUtility";
import { domGetClass, domGetClasses, domGetElementOrParentWithClassName } from "../../../utilities/DomUtility";
import { executeServiceCall } from "../../../utilities/ServiceUtility";
import { SidebarConnectionListItem } from "./SidebarConnectionListItem";
import { SidebarTableListItem } from "./SidebarTableListItem";


class SidebarListControllerElements
{
    public readonly listClass = `connections-sidebar-list`;
    public readonly containerClass = `${this.listClass}-container`;
    public readonly btnCloseSidebarClass = `${this.listClass}-btn-close`;
    public readonly btnShowSidebarClass = `${this.listClass}-btn-show-sidebar`;
    public readonly headerClass = `${this.listClass}-header`;
    public readonly appColumnSidebarClass = `app-column-sidebar`;
}

const ELE = new SidebarListControllerElements();
const CONNECTION = new ConnectionSidebarListItemTemplateElements();
const TABLE = new TableSidebarListItemTemplateElements();

export class SidebarListController implements IControllerAsync
{
    private readonly _container: HTMLDivElement;
    private readonly _list: HTMLUListElement;
    private readonly _connectionService: ConnectionsServiceGui;
    private readonly _btnCloseSidebar: HTMLButtonElement;
    private readonly _btnOpenSidebar: HTMLButtonElement;
    private readonly _appSidebar: HTMLDivElement;

    constructor ()
    {
        this._container = domGetClass<HTMLDivElement>(ELE.containerClass);
        this._list = domGetClass<HTMLUListElement>(ELE.listClass, this._container);
        this._connectionService = new ConnectionsServiceGui();
        this._btnCloseSidebar = domGetClass<HTMLButtonElement>(ELE.btnCloseSidebarClass, this._container);
        this._btnOpenSidebar = domGetClass<HTMLButtonElement>(ELE.btnShowSidebarClass);
        this._appSidebar = domGetClass<HTMLDivElement>(ELE.appColumnSidebarClass);
    }

    public async control(): Promise<void>
    {
        this.addListeners();
        await this.refreshAll();
    }

    //#region - Event listeners -
    private addListeners(): void
    {
        this.addListener_TableButtonClick();
        this.addListener_OpenTableCardClosedMessage();
        this.addListener_EditConnectionButtonClick()
        this.addListener_RefreshTablesButtonClick();
        this.addListener_DeleteConnectionButtonClick();
        this.addListener_CloseSidebarButtonClick();
        this.addListener_OpenSidebarButtonClick();
    }

    private addListener_OpenTableCardClosedMessage(): void
    {
        OpenTableCardClosedMessage.addListener((message) =>
        {
            const tableData = message.data;
            if (notNull(tableData))
            {
                this.closeTable(tableData);
            }
        });
    }

    private addListener_TableButtonClick(): void
    {
        this._list.addEventListener(NativeEventClick, (e) =>
        {
            const tableItem = this.getTableListItemFromEvent(e, TABLE.btnMain);
            tableItem?.showTable();
        });
    }

    private addListener_EditConnectionButtonClick(): void
    {
        this._list.addEventListener(NativeEventClick, (e) =>
        {
            const connection = this.getConnectionListItemFromEvent(e, CONNECTION.btnEditConnectionClass);
            connection?.editConnection();
        });
    }

    private addListener_RefreshTablesButtonClick(): void
    {
        this._list.addEventListener(NativeEventClick, async (e) =>
        {
            const connection = this.getConnectionListItemFromEvent(e, CONNECTION.btnRefreshTablesClass);
            await connection?.refreshTables();
        });
    }


    private addListener_DeleteConnectionButtonClick(): void
    {
        this._list.addEventListener(NativeEventClick, async (e) =>
        {
            const connection = this.getConnectionListItemFromEvent(e, CONNECTION.btnDeleteConnectionClass);
            await connection?.deleteConnection();
        });
    }

    private addListener_CloseSidebarButtonClick(): void
    {
        this._btnCloseSidebar.addEventListener(NativeEventClick, (e) =>
        {
            this.toggleSidebarVisibility(false);
        });
    }

    private addListener_OpenSidebarButtonClick(): void
    {
        this._btnOpenSidebar.addEventListener(NativeEventClick, (e) =>
        {
            this.toggleSidebarVisibility(true);
        });
    }

    //#endregion

    //#region - Refresh tables -
    public async refreshAll(): Promise<void>
    {
        // refresh connection list items
        const connectionModels = await this.getConnectionModelsFromApi();

        if (notNull(connectionModels))
        {
            this.displayConnectionModels(connectionModels);
        }

        // refresh each connections' tables
        const connectionListItems = this.getAllConnectionListItems();
        const refreshTablePromises = connectionListItems.map(c => c.refreshTables());
        await Promise.all(refreshTablePromises);
    }

    private async getConnectionModelsFromApi(): Promise<ConnectionModel[] | null>
    {
        return await executeServiceCall({
            callback: () => this._connectionService.getConnections(),
            errorMessage: `Unable to fetch connections`,
        });
    }

    private displayConnectionModels(connections: ConnectionModel[]): void
    {
        const htmlEngine = new ConnectionSidebarListItemTemplate();
        const html = htmlEngine.toHtmls(connections);
        this._list.innerHTML = html;
    }
    //#endregion

    //#region - Close table -
    private closeTable(tableData: TableColumnsRequestData): void
    {
        const table = this.getTableListItem(tableData);
        if (notNull(table))
        {
            table.isActive = false;
        }
    }
    //#endregion

    //#region - Item retrieval -
    private getAllConnectionListItems(): SidebarConnectionListItem[]
    {
        const elements = domGetClasses<HTMLLIElement>(CONNECTION.containerClass, this._list);
        return elements.map(e => new SidebarConnectionListItem(e));
    }

    private getTableListItem(tableData: TableColumnsRequestData): SidebarTableListItem | null
    {
        const tables = this.getAllTableListItems();
        return tables.find(t => t.isEqual(tableData)) ?? null;
    }

    private getAllTableListItems(): SidebarTableListItem[]
    {
        const elements = domGetClasses(TABLE.containerClass, this._list);
        return elements.map(e => new SidebarTableListItem(e));
    }

    private getTableListItemFromEvent(e: Event, className: string): SidebarTableListItem | null
    {
        const childElement = domGetElementOrParentWithClassName(e.target, className);
        if (notNull(childElement))
        {
            return new SidebarTableListItem(childElement);
        }
        return null;
    }

    private getConnectionListItemFromEvent(e: Event, className: string): SidebarConnectionListItem | null
    {
        const childElement = domGetElementOrParentWithClassName(e.target, className);
        if (notNull(childElement))
        {
            return new SidebarConnectionListItem(childElement);
        }
        return null;
    }
    //#endregion

    //#region Show/Hide Sidebar -
    private toggleSidebarVisibility(isVisible: boolean): void
    {
        if (isVisible)
        {
            bootstrapHideElement(this._btnOpenSidebar);
            this._container.classList.remove('collapsed');
            this._appSidebar.classList.remove('collapsed');
        }
        else
        {
            this._container.classList.add('collapsed');
            this._appSidebar.classList.add('collapsed');
            bootstrapShowElement(this._btnOpenSidebar);
        }
    }
    //#endregion
}


