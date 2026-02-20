import { notNull } from "../../../../shared/utilities/NullableUtility";
import { IControllerAsync } from "../../contracts/IController";
import { ConnectionsListRefreshMessage, TableSidebarListItemClickedMessage } from "../../domain/messages/CustomMessages";
import { ipcRegisterGuiEventHandlers } from "../../helpers/ipc/IpcHandler";
import { domGetClass } from "../../utilities/DomUtility";
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

    constructor()
    {
        this._openTables = new OpenTables();
        this._sidebar = new SidebarListController();
        this._container = domGetClass<HTMLDivElement>(ELE.containerClass);
    }

    public async control(): Promise<void>
    {
        ipcRegisterGuiEventHandlers();
        ConnectionForm.initialize();
        this.addListeners();
        this._openTables.control();
        await this._sidebar.control();
    }

    private addListeners(): void
    {
        this.addListener_TableSidebarListItemClickedMessage();
        this.addListener_ConnectionsListRefreshMessage();
    }

    private addListener_TableSidebarListItemClickedMessage(): void
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

    private addListener_ConnectionsListRefreshMessage(): void
    {
        ConnectionsListRefreshMessage.addListener(async (message) =>
        {
            await this._sidebar.refreshAll();
        });
    }
}


