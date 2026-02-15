
import { ConnectionModel } from "../../../shared/domain/models/connections/ConnectionModel";
import { HtmlTemplate } from "./HtmlTemplate";



export enum ConnectionListItemAction
{
    Edit = 'edit',
    Delete = 'delete',
}

export class ConnectionListItemTemplateElements
{
    public readonly containerClass = `connections-list-item`;
    public readonly idAttr = `data-connection-id`;
    public readonly actionButtonClass = `${this.containerClass}-action-button`;
    public readonly actionButtonAttr = `data-action`;
}

const ELE = new ConnectionListItemTemplateElements();

export class ConnectionListItemTemplate extends HtmlTemplate<ConnectionModel>
{
    public toHtml(model: ConnectionModel): string
    {
        let html = //html
            `
            <li class="${ELE.containerClass}" ${ELE.idAttr}="${model.id}">
                <div>${model.name}</div>
                <div class="dropstart">
                    <button class="btn btn-sm btn-light" data-bs-toggle="dropdown"><i class='bx bx-dots-horizontal-rounded'></i></button>
                    <div class="dropdown-menu">
                        <button type="button" class="dropdown-item ${ELE.actionButtonClass}" ${ELE.actionButtonAttr}="${ConnectionListItemAction.Edit}">Edit</button>
                        <button type="button" class="dropdown-item ${ELE.actionButtonClass}" ${ELE.actionButtonAttr}="${ConnectionListItemAction.Delete}">Delete</button>
                    </div>
                </div>
                
            </li>
        `;

        return html;
    }

}
