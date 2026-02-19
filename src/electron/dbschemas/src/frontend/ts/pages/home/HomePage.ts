import { notNull } from "../../../../shared/utilities/NullableUtility";
import { IControllerAsync } from "../../contracts/IController";
import { ConnectionsListViewConnectionMessage, TableSidebarListItemClickedMessage } from "../../domain/messages/CustomMessages";
import { ConnectionsList } from "./connections/ConnectionsList";
import { OpenTables } from "./open-tables/OpenTables";
import { TablesList } from "./tables/TablesList";

export class HomePageElements
{

}

const ELE = new HomePageElements();

export class HomePage implements IControllerAsync
{
    private _connections: ConnectionsList;
    private _tables: TablesList;
    private _openTables: OpenTables;

    constructor()
    {
        this._connections = new ConnectionsList();
        this._tables = new TablesList();
        this._openTables = new OpenTables();
    }

    public async control(): Promise<void>
    {
        this.addListeners();
        this._tables.control();
        this._openTables.control();
        await this._connections.control();
    }

    private addListeners(): void
    {
        this.addConnectionsListViewConnectionMessageListener();
        this.addTableSidebarListItemClickedMessageListener();
    }

    private addConnectionsListViewConnectionMessageListener()
    {
        ConnectionsListViewConnectionMessage.addListener(async (message) =>
        {
            if (notNull(message.data?.connectionId))
            {
                await this.viewConnection(message.data.connectionId);
            }
        });
    }

    private addTableSidebarListItemClickedMessageListener()
    {
        TableSidebarListItemClickedMessage.addListener(async (message) =>
        {
            if (message.data != null)
            {
                await this._openTables.showTable(message.data.tableRequestData);
            }
        });
    }

    private async viewConnection(connectionId: number)
    {
        await this._tables.showTables(connectionId);
    }
}


