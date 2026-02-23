import { TableFilterColumn } from "../../../../../shared/domain/constants/TableColumnFilter";
import { NotImplementedException } from "../../../../../shared/domain/errors/NotImplementedException";
import { ColumnDefinitionModel } from "../../../../../shared/domain/models/column-definitions/ColumnDefinitionModel";
import { TableColumnsRequestData } from "../../../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { IpcEventArgsFilterTableColumn } from "../../../../../shared/domain/models/ipc-event-args/IpcEventArgs";
import { TableDefinitionModel } from "../../../../../shared/domain/models/table-definitions/TableDefinitionModel";
import { notNull } from "../../../../../shared/utilities/NullableUtility";
import { BS_DISPLAY_NONE } from "../../../domain/bootstrap/BootstrapUtilityClasses";
import { OpenTableCardClosedMessage } from "../../../domain/messages/CustomMessages";
import { toastShowSuccess } from "../../../helpers/toasts/ToastUtility";
import { TableServiceGui } from "../../../services/TableServiceGui";
import { OpenTableCardTemplateElements } from "../../../templates/open-tables/OpenTableCardTemplate";
import { TableColumnCellElements } from "../../../templates/open-tables/TableColumnCellElements";
import { TableColumnListItemTemplate, TableColumnListItemTemplateElements } from "../../../templates/open-tables/TableColumnListItemTemplate";
import { bootstrapHideElement, bootstrapShowElement } from "../../../utilities/BootstrapUtility";
import { copyToClipboard } from "../../../utilities/ClipboardUtility";
import { domGetClass, domGetClasses, domGetClosestClass } from "../../../utilities/DomUtility";
import { executeServiceCall } from "../../../utilities/ServiceUtility";
import { OpenTableColumnDefinitionItem } from "./OpenTableColumnDefinitionItem";

const ELE = new OpenTableCardTemplateElements();
const ROW = new TableColumnListItemTemplateElements();
const CELL = new TableColumnCellElements();

export class OpenTablesCardItem
{
    private _container: HTMLDivElement;
    private _tableName: HTMLHeadingElement;
    private _spinner: HTMLDivElement;
    private _table: HTMLTableElement;
    private _tableService: TableServiceGui;
    private _rowHtmlEngine: TableColumnListItemTemplate;
    private _bodyContent: HTMLDivElement;

    public get cardId(): string
    {
        return this._container.getAttribute(ELE.cardIdAttr)!;
    }

    public get connectionId(): number
    {
        return parseInt(this._container.getAttribute(ELE.connectionIdAttr)!);
    }

    public get tableName(): string
    {
        return this._tableName.innerText;
    }

    public get isSpinnerVisible(): boolean
    {
        return this._spinner.classList.contains(BS_DISPLAY_NONE);
    }

    public set isSpinnerVisible(value: boolean)
    {
        if (value)
        {
            bootstrapShowElement(this._spinner);
            bootstrapHideElement(this._bodyContent);
        }
        else
        {
            bootstrapHideElement(this._spinner);
            bootstrapShowElement(this._bodyContent);
        }
    }

    constructor(e: Element)
    {
        this._container = domGetClosestClass<HTMLDivElement>(ELE.containerClass, e);
        this._tableName = domGetClass<HTMLHeadingElement>(ELE.tableNameClass, this._container);
        this._spinner = domGetClass<HTMLDivElement>(ELE.spinnerClass, this._container);
        this._table = domGetClass<HTMLTableElement>(ELE.tableClass, this._container);
        this._tableService = new TableServiceGui();
        this._rowHtmlEngine = new TableColumnListItemTemplate();
        this._bodyContent = domGetClass<HTMLDivElement>(ELE.bodyClass, this._container);
    }

    public clearColumnFilters(): void
    {
        // const classes = Array.from(this._container.classList);
        // const classesToRemove = classes.filter(c => c.startsWith(`hide-`));
        // classesToRemove.forEach(c => this._container.classList.remove(c));

        const columns = Object.keys(TableFilterColumn) as TableFilterColumn[];
        const classes = columns.map(c => this.getHideColumnClassName(c));
        classes.forEach(c => this._container.classList.remove(c));
    }

    public filterColumns(filter: IpcEventArgsFilterTableColumn): void
    {
        const className = this.getHideColumnClassName(filter.columnName);

        if (filter.isChecked)
        {
            this._container.classList.remove(className);
        }
        else
        {
            this._container.classList.add(className);
        }
    }

    private getHideColumnClassName(column: TableFilterColumn): string
    {
        let suffix = '';

        switch (column)
        {
            case TableFilterColumn.Position:
                suffix = CELL.positionClass; break;

            case TableFilterColumn.Name:
                suffix = CELL.nameClass; break;

            case TableFilterColumn.Default:
                suffix = CELL.defaultValueClass; break;

            case TableFilterColumn.Nullable:
                suffix = CELL.isNullableClass; break;

            case TableFilterColumn.Type:
                suffix = CELL.columnTypeClass; break;

            default:
                throw new NotImplementedException();
        }

        const className = `hide-${suffix}`;

        return className;
    }


    public remove(): void
    {
        this._container.remove();
    }

    public isEqual(tableInfo: TableColumnsRequestData): boolean
    {
        if (this.connectionId != tableInfo.connectionId)
        {
            return false;
        }
        if (this.tableName != tableInfo.tableName)
        {
            return false;
        }

        return true;
    }

    public closeCard(): void
    {
        OpenTableCardClosedMessage.invoke(this, this.getConnectionTableRequestData());
        this._container.remove();
    }

    public copyAllRows(): void
    {
        const rows = this.getAllRows();
        this.copyRowNamesToClipboard(rows);
    }

    public copySelectedRows(): void
    {
        const rows = this.getAllRows().filter(r => r.isActive);
        this.copyRowNamesToClipboard(rows);
    }

    private copyRowNamesToClipboard(rows: OpenTableColumnDefinitionItem[]): void
    {
        let text = '';
        let isFirst = true;

        for (const row of rows)
        {
            if (isFirst)
            {
                isFirst = false;
                text += `${row.name}`;
            }
            else
            {
                text += `\n${row.name}`;
            }
        }

        copyToClipboard(text);
        toastShowSuccess({ message: 'Copied to clipboard' });
    }

    public selectAllRows(): void
    {
        this.setAllRowsIsSelected(true);
    }

    public deselectAllRows(): void
    {
        this.setAllRowsIsSelected(false);
    }

    private setAllRowsIsSelected(isSelected: boolean): void
    {
        const rows = this.getAllRows();
        rows.forEach(r => r.isActive = isSelected);
    }


    private getAllRows(): OpenTableColumnDefinitionItem[]
    {
        const elements = domGetClasses<HTMLTableRowElement>(ROW.containerClass, this._table);
        return elements.map(e => new OpenTableColumnDefinitionItem(e));
    }

    //#region - Refresh columns -
    public async refreshColumns(): Promise<void>
    {
        this.isSpinnerVisible = true;

        const tableDefinition = await this.getTableDefinition(this.getConnectionTableRequestData());
        const columns = tableDefinition?.columns;
        if (notNull(columns))
        {
            this.displayColumns(columns);
        }

        this.isSpinnerVisible = false;
    }

    private async getTableDefinition(data: TableColumnsRequestData): Promise<TableDefinitionModel | null>
    {
        return await executeServiceCall({
            callback: () => this._tableService.getTableColumns(data),
            errorMessage: `Unable to fetch table columns`,
        });
    }

    private displayColumns(columns: ColumnDefinitionModel[]): void
    {
        const rows = domGetClasses<HTMLTableRowElement>(ROW.containerClass, this._table);
        rows.forEach(r => r.remove());

        const html = this._rowHtmlEngine.toHtmls(columns);
        const tbody = this._table.querySelector<HTMLElement>(`tbody`);
        tbody?.insertAdjacentHTML("afterbegin", html);
    }

    public getConnectionTableRequestData(): TableColumnsRequestData
    {
        return {
            connectionId: this.connectionId,
            tableName: this.tableName,
        };
    }
    //#endregion
}

