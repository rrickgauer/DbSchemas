import { ColumnDefinitionModel } from "../../../../shared/domain/models/column-definitions/ColumnDefinitionModel";
import { HtmlTemplate } from "../HtmlTemplate";
import { TableColumnCellElements } from "./TableColumnCellElements";



export class TableColumnListItemTemplateElements
{
    public readonly containerClass = `open-table-card-row`;
    public readonly btnCopyClass = `${this.containerClass}-btn-copy`;
    public readonly activeClass = `table-active`;
}

const CELL = new TableColumnCellElements();

const ELE = new TableColumnListItemTemplateElements();

export class TableColumnListItemTemplate extends HtmlTemplate<ColumnDefinitionModel>
{
    public toHtml(model: ColumnDefinitionModel): string
    {
        const checkedText = model.isNullable ? 'checked' : '';

        let html = //html
        `
        <tr class="${ELE.containerClass}">
            <td class="${CELL.cellClass} ${CELL.positionClass}">${model.position}</td>
            <td class="${CELL.cellClass} ${CELL.nameClass}">${model.name}</td>
            <td class="${CELL.cellClass} ${CELL.columnTypeClass}">${model.columnType}</td>
            <td class="${CELL.cellClass} ${CELL.isNullableClass}"><input class="form-check-input" disabled type="checkbox" name="is-nullable" ${checkedText} /></td>
            <td class="${CELL.cellClass} ${CELL.defaultValueClass}">${model.defaultValue}</td>
            <td class="${CELL.cellClass} ${CELL.copyRowClass}"><button type="button" class="btn btn-sm btn-light border-light-subtle ${ELE.btnCopyClass}"><i class='bx bx-copy'></i></button></td>
        </tr>
        `;

        return html;
    }

}