import { ColumnDefinitionModel } from "../../../../shared/domain/models/column-definitions/ColumnDefinitionModel";
import { HtmlTemplate } from "../HtmlTemplate";

export class TableColumnListItemTemplateElements
{
    public readonly containerClass = `open-table-card-row`;
    public readonly btnCopyClass = `${this.containerClass}-btn-copy`;
    public readonly activeClass = `table-active`;
    public readonly cellClass = `${this.containerClass}-cell`;
    public readonly cellPositionClass = `${this.cellClass}-position`;
    public readonly cellNameClass = `${this.cellClass}-name`;
    public readonly cellColumnTypeClass = `${this.cellClass}-column-type`;
    public readonly cellIsNullableClass = `${this.cellClass}-is-nullable`;
    public readonly cellDefaultValueClass = `${this.cellClass}-default-value`;
    public readonly cellCopyRowClass = `${this.cellClass}-copy-row`;
}

const ELE = new TableColumnListItemTemplateElements();

export class TableColumnListItemTemplate extends HtmlTemplate<ColumnDefinitionModel>
{
    public toHtml(model: ColumnDefinitionModel): string
    {
        const checkedText = model.isNullable ? 'checked' : '';

        let html = //html
        `
        <tr class="${ELE.containerClass}">
            <td class="${ELE.cellClass} ${ELE.cellPositionClass}">${model.position}</td>
            <td class="${ELE.cellClass} ${ELE.cellNameClass}">${model.name}</td>
            <td class="${ELE.cellClass} ${ELE.cellColumnTypeClass}">${model.columnType}</td>
            <td class="${ELE.cellClass} ${ELE.cellIsNullableClass}"><input class="form-check-input" disabled type="checkbox" name="is-nullable" ${checkedText} /></td>
            <td class="${ELE.cellClass} ${ELE.cellDefaultValueClass}">${model.defaultValue}</td>
            <td class="${ELE.cellClass} ${ELE.cellCopyRowClass}"><button type="button" class="btn btn-sm btn-light border-light-subtle ${ELE.btnCopyClass}"><i class='bx bx-copy'></i></button></td>
        </tr>
        `;

        return html;
    }

}