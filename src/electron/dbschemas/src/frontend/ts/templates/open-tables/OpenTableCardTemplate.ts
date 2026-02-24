import { SPINNER_HTML } from "../../../../shared/domain/constants/HtmlSnippets";
import { TableDefinitionModel } from "../../../../shared/domain/models/table-definitions/TableDefinitionModel";
import { HtmlTemplate } from "../HtmlTemplate";
import { TableColumnCellElements } from "./TableColumnCellElements";
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
    public readonly actionButtonClass = `${this.containerClass}-action-button`;
    public readonly btnCopyAllRowsClass = `${this.actionButtonClass}-copy-all`;
    public readonly btnCopySelectedRowsClass = `${this.actionButtonClass}-copy-selected`;
    public readonly btnRefreshClass = `${this.actionButtonClass}-refresh-columns`;
    public readonly btnSelectAllRows = `${this.actionButtonClass}-select-all-rows`;
    public readonly btnDeselectAllRows = `${this.actionButtonClass}-deselect-all-rows`;
    public readonly dragItem = `${this.containerClass}-drag`;
}

const CELL = new TableColumnCellElements();

const ELE = new OpenTableCardTemplateElements();

export class OpenTableCardTemplate extends HtmlTemplate<TableDefinitionModel>
{
    private readonly _columnsHtmlEngine = new TableColumnListItemTemplate();

    public toHtml(model: TableDefinitionModel): string
    {
        const cardId = `${model.connectionId}-${model.tableName}`;

        const actionButtonClass = `dropdown-item ${ELE.actionButtonClass}`;

        let html = //html
        `
        <div class="card ${ELE.containerClass}" ${ELE.cardIdAttr}="${cardId}" ${ELE.connectionIdAttr}="${model.connectionId}">
            <div class="card-header d-flex justify-content-between">
                <h5 class="${ELE.tableNameClass}">${model.tableName}</h5>
                <div class="${ELE.dragItem}" draggable="true"><i class='bx bx-grid-horizontal'></i></div>
                <div class="d-flex">
                    <div class="dropstart">
                        <button class="btn btn-sm" data-bs-toggle="dropdown" title="Table actions"><i class='bx bx-dots-horizontal-rounded'></i></button>
                        <div class="dropdown-menu">
                            <button class="${actionButtonClass} ${ELE.btnCopyAllRowsClass}">Copy all rows</button>
                            <button class="${actionButtonClass} ${ELE.btnCopySelectedRowsClass}">Copy selected rows</button>
                            <hr class="dropdown-divider" />

                            <button class="${actionButtonClass} ${ELE.btnSelectAllRows}">Select all rows</button>
                            <button class="${actionButtonClass} ${ELE.btnDeselectAllRows}">Clear selection</button>

                            <hr class="dropdown-divider" />
                            <button class="${actionButtonClass} ${ELE.btnRefreshClass}">Refresh columns</button>
                        </div>
                    </div>

                    <button type="button" class="btn-close ${ELE.btnCloseClass}" aria-label="Close"></button>
                </div>
                
            </div>
            <div class="card-body">
                <div class="${ELE.spinnerClass}">
                    ${SPINNER_HTML}
                </div>

                <div class="${ELE.bodyClass}">
                    <div class="table-responsive">
                        <table class="table table-sm table-hover ${ELE.tableClass}">
                            <thead>
                                <tr>
                                    <th scope="col" class="${CELL.cellClass} ${CELL.positionClass}">Position</th>
                                    <th scope="col" class="${CELL.cellClass} ${CELL.nameClass}">Name</th>
                                    <th scope="col" class="${CELL.cellClass} ${CELL.columnTypeClass}">Type</th>
                                    <th scope="col" class="${CELL.cellClass} ${CELL.isNullableClass}">Nullable</th>
                                    <th scope="col" class="${CELL.cellClass} ${CELL.defaultValueClass}">Default</th>
                                    <th scope="col" class="${CELL.cellClass} ${CELL.copyRowClass}">&nbsp;</th>
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