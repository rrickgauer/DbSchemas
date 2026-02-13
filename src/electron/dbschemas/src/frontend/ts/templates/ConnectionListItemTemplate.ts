import { ConnectionModel } from "../../../shared/domain/models/ConnectionModel";
import { HtmlTemplate } from "./HtmlTemplate";


export class ConnectionListItemTemplateElements
{
    public readonly containerClass = `connections-list-item`;
    public readonly idAttr = `data-connection-id`;
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
                <button class="btn btn-sm btn-light"><i class='bx bx-dots-horizontal-rounded'></i></button>
            </li>
        `;

        return html;
    }

}
