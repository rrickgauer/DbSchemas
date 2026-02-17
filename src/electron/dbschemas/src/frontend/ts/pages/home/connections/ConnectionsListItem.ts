import { isNull } from "../../../../../shared/utilities/nullable";
import { ShowConnectionFormMessage } from "../../../domain/messages/CustomMessages";
import { ConnectionsServiceGui } from "../../../services/ConnectionsServiceGui";
import { ConnectionListItemAction, ConnectionListItemTemplateElements } from "../../../templates/ConnectionListItemTemplate";
import { bootstrapHideElement, bootstrapShowElement } from "../../../utilities/bootstrap";
import { domGetClosestClass } from "../../../utilities/dom";
import { executeServiceCall } from "../../../utilities/ServiceResponses";

const ELE = new ConnectionListItemTemplateElements();

export class ConnectionsListItem
{
    private _container: HTMLElement;
    private _connectionService: ConnectionsServiceGui;

    public get connectionId(): number
    {
        return parseInt(this._container.getAttribute(ELE.idAttr)!);
    }

    constructor (e: Element)
    {
        this._container = domGetClosestClass<HTMLElement>(ELE.containerClass, e);
        this._connectionService = new ConnectionsServiceGui();
    }

    public async handleActionClick(action: ConnectionListItemAction): Promise<void>
    {
        switch (action)
        {
            case ConnectionListItemAction.Edit:
                this.editItem();
                break;

            case ConnectionListItemAction.Delete:
                await this.deleteItem();
                break;

            default:
                alert(`Unkown action: ${action}`);
                break;
        }
    }

    private editItem(): void
    {
        ShowConnectionFormMessage.invoke(this, {
            connectionId: this.connectionId,
        });
    }

    public async deleteItem(): Promise<void>
    {
        if (!confirm(`Are you sure you want to permanently this Database Connection?`))
        {
            return;
        }

        bootstrapHideElement(this._container);

        const result = await executeServiceCall({
            callback: () => this._connectionService.deleteConnection(this.connectionId),
            errorMessage: `Connection not deleted`,
            successMessage: `Connection deleted successfully`,
        });


        if (result != null && !result.hasError())
        {
            this._container.remove();
        }
        else
        {
            bootstrapShowElement(this._container);
        }
    }
}