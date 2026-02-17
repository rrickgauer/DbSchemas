import { HtmlTemplate } from "./HtmlTemplate";


export class TableListItemTemplateElements
{
    public readonly containerClass = `tables-list-item`;
    public readonly connectionIdAttr = `data-connection-id`;
    public readonly tableNameClass = `${this.containerClass}-table-name`;
    public readonly activeClass = `active`;
}

const ELE = new TableListItemTemplateElements();


export type TableListItemTemplateArgs = {
    tableName: string;
    connectionId: number;
}

export class TableListItemTemplate extends HtmlTemplate<TableListItemTemplateArgs>
{
    public toHtml(model: TableListItemTemplateArgs): string
    {
        let html = //html
        `
        <li class="list-group-item ${ELE.containerClass}" ${ELE.connectionIdAttr}="${model.connectionId}">
            <span class="${ELE.tableNameClass}">${model.tableName}<span>
        </li>
        `;

        return html;
    }
}
