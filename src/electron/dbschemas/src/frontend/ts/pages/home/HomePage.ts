import { notNull } from "../../../../shared/utilities/NullableUtility";
import { IControllerAsync } from "../../contracts/IController";
import { CloseAllOpenTablesMessage, ConnectionsListRefreshMessage, CopyAllOpenTablesMessage, OpenTableCardClosedMessage, RefreshPageMessage, TableSidebarListItemClickedMessage } from "../../domain/messages/CustomMessages";
import { ipcGetCurrentColumnFilters } from "../../helpers/ipc/IpcHandler";
import { toastShowSuccess } from "../../helpers/toasts/ToastUtility";
import { copyToClipboard } from "../../utilities/ClipboardUtility";
import { domGetClass } from "../../utilities/DomUtility";
import { pageHideLoadingScreen, pageShowLoadingScreen } from "../../utilities/PageUtility";
import { sessionAppendOpenTable, sessionGetIsSidebarOpen, sessionGetOpenTables, sessionRemoveOpenTable } from "../../utilities/SessionUtility";
import { getAllOpenTableCardItems } from "./HomePageRoutines";
import { OpenTables } from "./open-tables/OpenTables";
import { initializeSearchModal } from "./search/SearchModalUtilities";
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

    constructor()
    {
        this._openTables = new OpenTables();
        this._sidebar = new SidebarListController();
        this._container = domGetClass<HTMLDivElement>(ELE.containerClass);
    }

    public async control(): Promise<void>
    {
        pageShowLoadingScreen();
        initializeSearchModal();
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
        this.addListener_CopyAllOpenTablesMessage();
        this.addListener_CloseAllOpenTablesMessage();
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

    private addListener_CopyAllOpenTablesMessage(): void
    {
        CopyAllOpenTablesMessage.addListener((message) =>
        {
            this._openTables.copyAll();
        });
    }

    private addListener_CloseAllOpenTablesMessage(): void
    {
        CloseAllOpenTablesMessage.addListener((message) =>
        {
            this._openTables.closeAll();
        });
    }

}


