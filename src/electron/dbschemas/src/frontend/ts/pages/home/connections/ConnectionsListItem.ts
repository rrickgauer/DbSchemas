import { ShowConnectionFormMessage } from "../../../domain/messages/CustomMessages";
import { ConnectionListItemAction, ConnectionListItemTemplateElements } from "../../../templates/ConnectionListItemTemplate";
import { domGetClosestClass } from "../../../utilities/dom";

const ELE = new ConnectionListItemTemplateElements();

export class ConnectionsListItem
{
    private _container: HTMLElement;

    public get connectionId(): number
    {
        return parseInt(this._container.getAttribute(ELE.idAttr)!);
    }

    constructor(e: Element)
    {
        this._container = domGetClosestClass<HTMLElement>(ELE.containerClass, e);
    }

    public async handleActionClick(action: ConnectionListItemAction): Promise<void>
    {
        switch(action)
        {
            case ConnectionListItemAction.Edit:
                ShowConnectionFormMessage.invoke(this, {
                    connectionId: this.connectionId,
                });
                
                break;

            default:
                alert(`Unkown action: ${action}`);
                break;
        }
    }
}