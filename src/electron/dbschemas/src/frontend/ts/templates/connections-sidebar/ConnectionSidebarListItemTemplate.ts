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
    public readonly dropdownMenuClass = `${this.containerClass}-dropdown`;

    public readonly btnEditConnectionClass = `${this.dropdownMenuClass}-btn-edit-connection`;
    public readonly btnRefreshTablesClass = `${this.dropdownMenuClass}-btn-refresh-tables`;
    public readonly btnDeleteConnectionClass = `${this.dropdownMenuClass}-btn-delete-connection`;
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

                <div class="dropstart ${ELE.dropdownMenuClass}">
                    <button type="button" class="btn btn-sm btn-light ms-1" data-bs-toggle="dropdown"><i class='bx bx-dots-horizontal-rounded'></i></button>
                    <div class="dropdown-menu">
                        <button type="button" class="dropdown-item ${ELE.btnEditConnectionClass}" title="Edit this connection information">Edit</button>
                        <button type="button" class="dropdown-item ${ELE.btnRefreshTablesClass}" title="Refresh this connection's table list">Refresh</button>
                        <button type="button" class="dropdown-item ${ELE.btnDeleteConnectionClass}" title="Delete this connection">Delete</button>
                    </div>
                </div>
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



