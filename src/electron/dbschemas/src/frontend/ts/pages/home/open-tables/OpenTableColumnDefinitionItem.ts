import { getValueNullable } from "../../../../../shared/utilities/NullableUtility";
import { toastShowSuccess } from "../../../helpers/toasts/ToastUtility";
import { TableColumnListItemTemplateElements } from "../../../templates/open-tables/TableColumnListItemTemplate";
import { copyToClipboard } from "../../../utilities/ClipboardUtility";
import { domGetClass, domGetClosestClass, domQuery } from "../../../utilities/DomUtility";

const ELE = new TableColumnListItemTemplateElements();

export class OpenTableColumnDefinitionItem
{
    private readonly _container: HTMLTableRowElement;
    private readonly _cellPosition: HTMLTableCellElement;
    private readonly _cellName: HTMLTableCellElement;
    private readonly _cellColumnType: HTMLTableCellElement;
    private readonly _cellIsNullable: HTMLTableCellElement;
    private readonly _cellDefaultValue: HTMLTableCellElement;
    private readonly _cellCopyRow: HTMLTableCellElement;
    private readonly _isNullableCheckbox: HTMLInputElement;

    public get isActive(): boolean
    {
        return this._container.classList.contains(ELE.activeClass);
    }

    public set isActive(value: boolean)
    {
        if (value)
        {
            this._container.classList.add(ELE.activeClass);
        }
        else
        {
            this._container.classList.remove(ELE.activeClass);
        }
    }

    public get position(): number
    {
        return parseInt(this._cellPosition.innerText);
    }

    public get name(): string
    {
        return this._cellName.innerText;
    }

    public get columnType(): string | null
    {
        return getValueNullable(this._cellColumnType.innerText, null);
    }

    public get isNullable(): boolean
    {
        return this._isNullableCheckbox.checked;
    }

    public get defaultValue(): string | null
    {
        return getValueNullable(this._cellDefaultValue.innerText, null);
    }

    constructor(e: Element)
    {
        this._container = domGetClosestClass<HTMLTableRowElement>(ELE.containerClass, e);

        this._cellPosition = domGetClass<HTMLTableCellElement>(ELE.cellPositionClass, this._container);
        this._cellName = domGetClass<HTMLTableCellElement>(ELE.cellNameClass, this._container);
        this._cellColumnType = domGetClass<HTMLTableCellElement>(ELE.cellColumnTypeClass, this._container);
        this._cellIsNullable = domGetClass<HTMLTableCellElement>(ELE.cellIsNullableClass, this._container);
        this._cellDefaultValue = domGetClass<HTMLTableCellElement>(ELE.cellDefaultValueClass, this._container);
        this._cellCopyRow = domGetClass<HTMLTableCellElement>(ELE.cellCopyRowClass, this._container);
        this._isNullableCheckbox = domQuery<HTMLInputElement>(`input`, this._cellIsNullable);
    }

    public copyRow(): void
    {
        copyToClipboard(this.name);
        toastShowSuccess({message: 'Copied to clipboard'});
    }
}
