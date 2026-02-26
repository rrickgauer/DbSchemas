import { HtmlTemplate } from "./HtmlTemplate";

export type SearchResultsListItemTemplateArgs = {
    tableName: string;
    connectionId: number;
    connectionName: string;
    isActive: boolean;
}

export class SearchResultsListItemTemplateElements
{
    public readonly containerClass = `search-results-list-item`;
    public readonly tableNameAttr = `data-table-name`;
    public readonly connectionIdAttr = `data-connection-id`;
    public readonly tableNameClass = `table-name`;
    public readonly connectionNameClass = `connection-name`;
    public readonly activeClassName = `active`;
}

const ELE = new SearchResultsListItemTemplateElements();

export class SearchResultsListItemTemplate extends HtmlTemplate<SearchResultsListItemTemplateArgs>
{
    public toHtml(model: SearchResultsListItemTemplateArgs): string
    {
        const active = model.isActive ? ELE.activeClassName : '';

        let html = //html
        `
        <button type="button" class="list-group-item list-group-item-action ${active} ${ELE.containerClass}" ${ELE.tableNameAttr}="${model.tableName}" ${ELE.connectionIdAttr}="${model.connectionId}">
            <div class="${ELE.tableNameClass}">${model.tableName}</div>
            <div class="${ELE.connectionNameClass}">${model.connectionName}</div>
        </button>
        `;

        return html;
    }

}