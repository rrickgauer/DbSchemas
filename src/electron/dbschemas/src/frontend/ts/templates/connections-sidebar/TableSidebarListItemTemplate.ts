import { HtmlTemplate } from "../HtmlTemplate";


export type TableSidebarListItemTemplateArgs = {
    tableName: string;
    connectionId: number;
}

export class TableSidebarListItemTemplateElements
{
    public readonly containerClass = `sidebar-table-list-item`;
    public readonly tableNameAttr = `data-table-name`;
    public readonly connectionIdAttr = `data-connection-id`;
    public readonly btnMain = `${this.containerClass}-btn-main`;
    public readonly isActiveClass = `active`;
}



const ELE = new TableSidebarListItemTemplateElements();

export class TableSidebarListItemTemplate extends HtmlTemplate<TableSidebarListItemTemplateArgs>
{
    public toHtml(model: TableSidebarListItemTemplateArgs): string
    {
        let html = //html
        `
        <li class="${ELE.containerClass}" ${ELE.tableNameAttr}="${model.tableName}" ${ELE.connectionIdAttr}="${model.connectionId}">
            <button type="button" class="btn btn-sm ${ELE.btnMain}">${model.tableName}</button>
        </li>
        `;

        return html;
    }

}
