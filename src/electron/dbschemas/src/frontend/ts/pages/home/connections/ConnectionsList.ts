import { NativeEventClick } from "../../../../../shared/domain/constants/native-events";
import { ConnectionModel } from "../../../../../shared/domain/models/connections/ConnectionModel";
import { IControllerAsync } from "../../../contracts/IController";
import { ConnectionsListRefreshMessage, ShowConnectionFormMessage } from "../../../domain/messages/CustomMessages";
import { ConnectionsServiceGui } from "../../../services/ConnectionsServiceGui";
import { ConnectionListItemAction, ConnectionListItemTemplate, ConnectionListItemTemplateElements } from "../../../templates/ConnectionListItemTemplate";
import { domGetClass, domGetElementOrParentWithClassName } from "../../../utilities/dom";
import { executeServiceCall } from "../../../utilities/ServiceResponses";
import { ConnectionForm } from "./ConnectionForm";
import { ConnectionsListItem } from "./ConnectionsListItem";

export class ConnectionsListElements
{
    public readonly listClass = `connections-list`;
    public readonly containerClass = `${this.listClass}-container`;
    public readonly btnNewConnectionClass = `btn-${this.listClass}-new`;
}

const ELE = new ConnectionsListElements();
const ITEM = new ConnectionListItemTemplateElements();

export class ConnectionsList implements IControllerAsync
{
    private readonly _connectionService: ConnectionsServiceGui;
    private readonly _htmlEngine: ConnectionListItemTemplate;
    private readonly _connectionsListContainer: HTMLUListElement;
    private readonly _container: HTMLDivElement;
    private readonly _btnNewConnection: HTMLButtonElement;

    constructor ()
    {
        this._connectionService = new ConnectionsServiceGui();
        this._htmlEngine = new ConnectionListItemTemplate();
        this._container = domGetClass<HTMLDivElement>(ELE.containerClass);
        this._connectionsListContainer = domGetClass<HTMLUListElement>(ELE.listClass, this._container);
        this._btnNewConnection = domGetClass<HTMLButtonElement>(ELE.btnNewConnectionClass, this._container);
    }

    public async control(): Promise<void>
    {
        ConnectionForm.initialize();
        this.addListeners();
        await this.refreshConnectionsList();
    }

    private addListeners(): void
    {
        this.addNewConnectionButtonClickListener();
        this.addConnectionsListRefreshMessageListener();
        this.addActionButtonClickListener();
    }

    private addNewConnectionButtonClickListener(): void
    {
        this._btnNewConnection.addEventListener(NativeEventClick, async (e) =>
        {
            ShowConnectionFormMessage.invoke(this, {
                connectionId: null,
            });
        });
    }

    private addConnectionsListRefreshMessageListener(): void
    {
        ConnectionsListRefreshMessage.addListener(async (m) =>
        {
            await this.refreshConnectionsList();
        });
    }

    private addActionButtonClickListener(): void
    {
        this._container.addEventListener(NativeEventClick, async (e) =>
        {
            const target = domGetElementOrParentWithClassName(e.target, ITEM.actionButtonClass);
            if (target)
            {
                const action = target?.getAttribute(ITEM.actionButtonAttr) as ConnectionListItemAction;
                const listItem = new ConnectionsListItem(target);
                await listItem.handleActionClick(action);
            }
        });
    }

    //#region - Refresh list -
    public async refreshConnectionsList(): Promise<void>
    {
        const connections = await this.getConnections();

        if (connections)
        {
            this.setConnectionsListHtml(connections);
        }

    }

    private setConnectionsListHtml(connections: ConnectionModel[]): void
    {
        this._connectionsListContainer.innerHTML = '';

        const html = this._htmlEngine.toHtmls(connections);

        this._connectionsListContainer.insertAdjacentHTML("afterbegin", html);
    }

    private async getConnections(): Promise<ConnectionModel[] | null>
    {
        return await executeServiceCall({
            callback: () => this._connectionService.getConnections(),
            errorMessage: `Unable to fetch connections`,
        });
    }
    //#endregion
}
