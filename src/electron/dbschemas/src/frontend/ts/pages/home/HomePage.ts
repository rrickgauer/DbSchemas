import { NativeEventClick } from "../../../../shared/domain/constants/NativeEvents";
import { notNull } from "../../../../shared/utilities/NullableUtility";
import { IControllerAsync } from "../../contracts/IController";
import { ConnectionsListRefreshMessage, ShowConnectionFormMessage, TableSidebarListItemClickedMessage } from "../../domain/messages/CustomMessages";
import { registerIpcEventHandlers } from "../../helpers/ipc/IpcHandler";
import { bootstrapHideElement, bootstrapShowElement } from "../../utilities/BootstrapUtility";
import { domGetClass } from "../../utilities/DomUtility";
import { OpenTables } from "./open-tables/OpenTables";
import { ConnectionForm } from "./sidebar/ConnectionForm";
import { SidebarListController } from "./sidebar/SidebarList";

export class HomePageElements
{
    public readonly listClass = `connections-sidebar-list`;
    public readonly containerClass = `${this.listClass}-container`;
    public readonly btnNewConnectionClass = `${this.listClass}-btn-new-connection`;
    public readonly btnRefreshConnectionsClass = `${this.listClass}-btn-refresh-connections`;
    public readonly btnCloseSidebarClass = `${this.listClass}-btn-close`;
    public readonly btnShowSidebarClass = `${this.listClass}-btn-show-sidebar`;
    public readonly appColumnSidebarClass = `app-column-sidebar`;
}

const ELE = new HomePageElements();

export class HomePage implements IControllerAsync
{
    private readonly _openTables: OpenTables;
    private readonly _sidebar: SidebarListController;
    private readonly _btnClose: HTMLButtonElement;
    private readonly _btnShowSidebar: HTMLButtonElement;
    private readonly _container: HTMLDivElement;
    private readonly _appSidebar: HTMLDivElement;

    constructor()
    {
        this._openTables = new OpenTables();
        this._sidebar = new SidebarListController();
        this._btnClose = domGetClass<HTMLButtonElement>(ELE.btnCloseSidebarClass);
        this._btnShowSidebar = domGetClass<HTMLButtonElement>(ELE.btnShowSidebarClass);
        this._container = domGetClass<HTMLDivElement>(ELE.containerClass);
        this._appSidebar = domGetClass<HTMLDivElement>(ELE.appColumnSidebarClass);
    }

    public async control(): Promise<void>
    {
        ConnectionForm.initialize();
        this.addListeners();
        this._openTables.control();
        registerIpcEventHandlers();
        await this._sidebar.control();
    }

    private addListeners(): void
    {
        this.addTableSidebarListItemClickedMessageListener();

        this._btnClose.addEventListener(NativeEventClick, (e) =>
        {
            this.toggleSidebarVisibility(false);
        });

        this._btnShowSidebar.addEventListener(NativeEventClick, (e) =>
        {
            this.toggleSidebarVisibility(true);
        });

        ConnectionsListRefreshMessage.addListener(async (message) =>
        {
            await this._sidebar.refreshAll();
        });
    }

    private toggleSidebarVisibility(isVisible: boolean)
    {
        if (isVisible)
        {
            bootstrapHideElement(this._btnShowSidebar);
            this._container.classList.remove('collapsed');
            this._appSidebar.classList.remove('collapsed');
        }
        else
        {
            this._container.classList.add('collapsed');
            this._appSidebar.classList.add('collapsed');
            bootstrapShowElement(this._btnShowSidebar);
        }
    }

    private addTableSidebarListItemClickedMessageListener(): void
    {
        TableSidebarListItemClickedMessage.addListener(async (message) =>
        {
            const tableData = message.data?.tableRequestData;
            if (notNull(tableData))
            {
                await this._openTables.showTable(tableData);
            }
        });
    }
}


