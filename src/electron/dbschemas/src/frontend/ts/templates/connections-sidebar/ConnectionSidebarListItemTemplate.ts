import { ConnectionModel } from "../../../../shared/domain/models/connections/ConnectionModel";
import { getConnectionTypeBadgeHtml } from "../ConnectionTypeBadgeTemplate";
import { HtmlTemplate } from "../HtmlTemplate";

export class ConnectionSidebarListItemTemplateElements
{
    public readonly containerClass = `connections-sidebar-list-item`;
    public readonly connnectionIdAttr = `data-connection-id`;
    public readonly tablesListClass = `${this.containerClass}-tables-list`;
    public readonly tablesContainerClass = `${this.tablesListClass}-container`;
    public readonly connectionTypeAttr = `data-connection-type`;
    public readonly btnToggleClass = `${this.containerClass}-btn-toggle`;
}

const ELE = new ConnectionSidebarListItemTemplateElements();

export class ConnectionSidebarListItemTemplate extends HtmlTemplate<ConnectionModel>
{
    public toHtml(model: ConnectionModel): string
    {
        const tablesContainerId = `${ELE.tablesContainerClass}-${model.id}`;

        let html = //html
        `
        <li class="${ELE.containerClass}" ${ELE.connnectionIdAttr}="${model.id}" ${ELE.connectionTypeAttr}="${model.connectionType}">

            <div class="d-flex align-items-center">
                <button type="button" class="btn btn-toggle me-auto ${ELE.btnToggleClass}" data-bs-toggle="collapse" data-bs-target="#${tablesContainerId}">
                    ${model.name}
                </button>

                ${getConnectionTypeBadgeHtml(model.connectionType)}
            </div>

            <div class="collapse ${ELE.tablesContainerClass}" id="${tablesContainerId}">
                <ul class="${ELE.tablesListClass} list-unstyled">
                    <li>table1</li>
                    <li>table2</li>
                    <li>table3</li>
                </ul>
            </div>
        </li>
        `;

        return html;
    }
}



