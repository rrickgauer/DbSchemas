import { SPINNER_HTML } from "../../../../shared/domain/constants/HtmlSnippets";
import { TableDefinitionModel } from "../../../../shared/domain/models/table-definitions/TableDefinitionModel";
import { HtmlTemplate } from "../HtmlTemplate";
import { TableColumnListItemTemplate } from "./TableColumnListItemTemplate";

export class OpenTableCardTemplateElements
{
    public readonly containerClass = `open-table-card`;
    public readonly tableClass = `${this.containerClass}-table`;
    public readonly btnCloseClass = `${this.containerClass}-btn-close`;
    public readonly cardIdAttr = `data-card-id`;
    public readonly connectionIdAttr = `data-connection-id`;
    public readonly tableNameClass = `${this.containerClass}-table-name`;
    public readonly spinnerClass = `${this.containerClass}-spinner`;
    public readonly bodyClass = `${this.containerClass}-body-content`;
    public readonly actionButtonsContainerClass = `${this.containerClass}-action-buttons`;
    public readonly actionButtonClass = `${this.containerClass}-action-button`;
    public readonly btnCopyAllRowsClass = `${this.actionButtonClass}-copy-all`;
    public readonly btnCopySelectedRowsClass = `${this.actionButtonClass}-copy-selected`;
    public readonly btnRefreshClass = `${this.actionButtonClass}-refresh-columns`;
    public readonly btnSelectAllRows = `${this.actionButtonClass}-select-all-rows`;
    public readonly btnDeselectAllRows = `${this.actionButtonClass}-deselect-all-rows`;

    public readonly dragItem = `${this.containerClass}-drag`;

}

const ELE = new OpenTableCardTemplateElements();

export class OpenTableCardTemplate extends HtmlTemplate<TableDefinitionModel>
{
    private readonly _columnsHtmlEngine = new TableColumnListItemTemplate();

    public toHtml(model: TableDefinitionModel): string
    {
        const cardId = `${model.connectionId}-${model.tableName}`;

        const topButtonClasses = `btn btn-sm btn-light border-light-subtle ${ELE.actionButtonClass}`;

        let html = //html
        `
        <div class="card ${ELE.containerClass}" ${ELE.cardIdAttr}="${cardId}" ${ELE.connectionIdAttr}="${model.connectionId}">
            <div class="card-header d-flex justify-content-between">
                <h5 class="${ELE.tableNameClass}">${model.tableName}</h5>
                <div class="${ELE.dragItem} ms-auto" draggable="true"><i class='bx bx-grid-horizontal'></i></div>
                <button type="button" class="btn-close ${ELE.btnCloseClass}" aria-label="Close"></button>
            </div>
            <div class="card-body">
                <div class="${ELE.spinnerClass}">
                    ${SPINNER_HTML}
                </div>

                <div class="${ELE.bodyClass}">
                    <div class="${ELE.actionButtonsContainerClass}">
                        <button type="button" class="${topButtonClasses} me-1 ${ELE.btnCopyAllRowsClass}" title="Copy all rows">Copy all</button>
                        <button type="button" class="${topButtonClasses} me-3 ${ELE.btnCopySelectedRowsClass}" title="Copy the selected rows">Copy selected</button>
                        <button type="button" class="${topButtonClasses} me-1 ${ELE.btnSelectAllRows}" title="Select all rows">Select all</button>
                        <button type="button" class="${topButtonClasses} me-3 ${ELE.btnDeselectAllRows}" title="Deselect all rows">Deselect all</button>
                        <button type="button" class="${topButtonClasses} ${ELE.btnRefreshClass}" title="Refresh the columns">Refresh</button>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-sm table-hover ${ELE.tableClass}">
                            <thead>
                                <tr>
                                    <th scope="col">Position</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Type</th>
                                    <th scope="col">Nullable</th>
                                    <th scope="col">Default</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.getColumnsHtml(model)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        `;

        return html;
    }

    private getColumnsHtml(model: TableDefinitionModel): string
    {
        if (model.columns == null)
        {
            return '';
        }

        return this._columnsHtmlEngine.toHtmls(model.columns);
    }
}