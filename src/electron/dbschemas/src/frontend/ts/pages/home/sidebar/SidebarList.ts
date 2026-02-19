import { NativeEventClick } from "../../../../../shared/domain/constants/NativeEvents";
import { TableColumnsRequestData } from "../../../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { ConnectionModel } from "../../../../../shared/domain/models/connections/ConnectionModel";
import { notNull } from "../../../../../shared/utilities/NullableUtility";
import { IControllerAsync } from "../../../contracts/IController";
import { OpenTableCardClosedMessage } from "../../../domain/messages/CustomMessages";
import { ConnectionsServiceGui } from "../../../services/ConnectionsServiceGui";
import { TableServiceGui } from "../../../services/TableServiceGui";
import { ConnectionSidebarListItemTemplate, ConnectionSidebarListItemTemplateElements } from "../../../templates/connections-sidebar/ConnectionSidebarListItemTemplate";
import { TableSidebarListItemTemplateElements } from "../../../templates/connections-sidebar/TableSidebarListItemTemplate";
import { domGetClass, domGetClasses, domGetElementOrParentWithClassName } from "../../../utilities/DomUtility";
import { executeServiceCall } from "../../../utilities/ServiceUtility";
import { SidebarConnectionListItem } from "./SidebarConnectionListItem";
import { SidebarTableListItem } from "./SidebarTableListItem";


class SidebarListControllerElements
{
    public readonly listClass = `connections-sidebar-list`;
    public readonly containerClass = `${this.listClass}-container`;
}

const ELE = new SidebarListControllerElements();
const CONNECTION = new ConnectionSidebarListItemTemplateElements();
const TABLE = new TableSidebarListItemTemplateElements();

export class SidebarListController implements IControllerAsync
{
    private _container: HTMLDivElement;
    private _list: HTMLUListElement;
    private _connectionService: ConnectionsServiceGui;
    private _tableService: TableServiceGui;

    constructor()
    {
        this._container = domGetClass<HTMLDivElement>(ELE.containerClass);
        this._list = domGetClass<HTMLUListElement>(ELE.listClass, this._container);
        this._connectionService = new ConnectionsServiceGui();
        this._tableService = new TableServiceGui();
    }

    public async control(): Promise<void>
    {
        this.addListeners();

        await this.refreshAll();
    }

    private addListeners(): void
    {
        this.addTableButtonClickListener();
        this.addOpenTableCardClosedMessageListener();
    }

    private addOpenTableCardClosedMessageListener()
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

    private addTableButtonClickListener()
    {
        this._list.addEventListener(NativeEventClick, (e) =>
        {
            const tableItem = this.getTableListItemFromChild(e, TABLE.btnMain);
            tableItem?.showTable();
        });
    }

    private getTableListItemFromChild(e: Event, className: string): SidebarTableListItem | null
    {
        const childElement = domGetElementOrParentWithClassName(e.target, className);
        if (notNull(childElement))
        {
            return new SidebarTableListItem(childElement);
        }
        return null;
    }

    public async refreshAll(): Promise<void>
    {
        // refresh connection list items
        const connectionModels = await this.getConnectionModels();

        if (notNull(connectionModels))
        {
            this.displayConnectionModels(connectionModels);
        }

        // refresh each connections' tables
        const connectionListItems = this.getAllConnectionListItems();
        const refreshTablePromises = connectionListItems.map(c => c.refreshTables());
        await Promise.all(refreshTablePromises);
    }


    private async getConnectionModels(): Promise<ConnectionModel[] | null>
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

    private getAllConnectionListItems(): SidebarConnectionListItem[]
    {
        const elements = domGetClasses<HTMLLIElement>(CONNECTION.containerClass, this._list);
        return elements.map(e => new SidebarConnectionListItem(e));
    }

    private closeTable(tableData: TableColumnsRequestData): void
    {
        const table = this.getTableListItem(tableData);
        if (notNull(table))
        {
            table.isActive = false;
        }
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
}


