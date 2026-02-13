import { NativeEventClick } from "../../../../../shared/domain/constants/native-events";
import { ConnectionModel } from "../../../../../shared/domain/models/ConnectionModel";
import { IControllerAsync } from "../../../contracts/IController";
import { toastShowSuccess } from "../../../helpers/toasts/toasts";
import { ConnectionsServiceGui } from "../../../services/ConnectionsServiceGui";
import { ConnectionListItemTemplate, ConnectionListItemTemplateElements } from "../../../templates/ConnectionListItemTemplate";
import { domGetClass } from "../../../utilities/dom";
import { ConnectionForm } from "./ConnectionForm";

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
    private _connectionService: ConnectionsServiceGui;
    private _htmlEngine: ConnectionListItemTemplate;
    private _connectionsListContainer: HTMLUListElement;
    private _container: HTMLDivElement;
    private _btnNewConnection: HTMLButtonElement;
    private _connectionForm: ConnectionForm;

    constructor()
    {
        this._connectionService = new ConnectionsServiceGui();
        this._htmlEngine = new ConnectionListItemTemplate();
        this._container = domGetClass<HTMLDivElement>(ELE.containerClass);
        this._connectionsListContainer = domGetClass<HTMLUListElement>(ELE.listClass, this._container);
        this._btnNewConnection = domGetClass<HTMLButtonElement>(ELE.btnNewConnectionClass, this._container);
        this._connectionForm = new ConnectionForm();
    }

    public async control(): Promise<void>
    {
        this.addListeners();
        this._connectionForm.control();
        await this.refreshConnectionsList();
    }

    private addListeners()
    {
        this._btnNewConnection.addEventListener(NativeEventClick, (e) =>
        {
            this._connectionForm.show();

            toastShowSuccess({
                message: 'testing',
                title: 'rmr',
            });
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

    private async getConnections(): Promise<ConnectionModel[]>
    {
        return await this._connectionService.getConnections();
    }
    //#endregion
}
