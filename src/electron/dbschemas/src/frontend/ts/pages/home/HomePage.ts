import { notNull } from "../../../../shared/utilities/NullableUtility";
import { IControllerAsync } from "../../contracts/IController";
import { ConnectionsListRefreshMessage, OpenTableCardClosedMessage, RefreshPageMessage, TableSidebarListItemClickedMessage } from "../../domain/messages/CustomMessages";
import { domGetClass } from "../../utilities/DomUtility";
import { pageHideLoadingScreen, pageShowLoadingScreen } from "../../utilities/PageUtility";
import { sessionAppendOpenTable, sessionGetIsSidebarOpen, sessionGetOpenTables, sessionRemoveOpenTable } from "../../utilities/SessionUtility";
import { OpenTables } from "./open-tables/OpenTables";
import { ConnectionForm } from "./sidebar/ConnectionForm";
import { SidebarListController } from "./sidebar/SidebarList";

export class HomePageElements
{
    public readonly listClass = `connections-sidebar-list`;
    public readonly containerClass = `${this.listClass}-container`;
}

const ELE = new HomePageElements();

export class HomePage implements IControllerAsync
{
    private readonly _openTables: OpenTables;
    private readonly _sidebar: SidebarListController;
    private readonly _container: HTMLDivElement;

    constructor ()
    {
        this._openTables = new OpenTables();
        this._sidebar = new SidebarListController();
        this._container = domGetClass<HTMLDivElement>(ELE.containerClass);
    }

    public async control(): Promise<void>
    {
        pageShowLoadingScreen();
        ConnectionForm.initialize();
        this.addListeners();
        this._openTables.control();

        this._sidebar.toggleSidebarVisibility(sessionGetIsSidebarOpen());
        await this._sidebar.control();

        // display cached tables
        await this.restoreCachedTables();
    }

    private async restoreCachedTables(): Promise<void>
    {
        pageShowLoadingScreen();
        const cachedTables = sessionGetOpenTables();
        this._sidebar.setItemsToActive(cachedTables);
        await this._openTables.showTables(cachedTables);
        pageHideLoadingScreen();
    }


    private addListeners(): void
    {
        this.addListener_TableSidebarListItemClickedMessage();
        this.addListener_ConnectionsListRefreshMessage();
        this.addListener_OpenTableCardClosedMessage();
        this.addListener_RefreshPageMessage();
    }

    private addListener_TableSidebarListItemClickedMessage(): void
    {
        TableSidebarListItemClickedMessage.addListener(async (message) =>
        {
            const tableData = message.data?.tableRequestData;
            if (notNull(tableData))
            {
                sessionAppendOpenTable(tableData);
                await this._openTables.showTable(tableData);
            }
        });
    }

    private addListener_ConnectionsListRefreshMessage(): void
    {
        ConnectionsListRefreshMessage.addListener(async (message) =>
        {
            await this._sidebar.resetListItems();
        });
    }

    private addListener_OpenTableCardClosedMessage(): void
    {
        OpenTableCardClosedMessage.addListener((message) =>
        {
            const tableData = message.data;
            if (tableData == null)
            {
                return;
            }

            this._sidebar.deactivateItem(tableData);
            sessionRemoveOpenTable(tableData);
        });
    }

    private addListener_RefreshPageMessage()
    {
        RefreshPageMessage.addListener(async (message) =>
        {
            await this.restoreCachedTables();
        });
    }
}


