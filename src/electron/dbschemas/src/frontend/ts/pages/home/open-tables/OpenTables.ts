import { NativeEventClick } from "../../../../../shared/domain/constants/NativeEvents";
import { TableColumnsRequestData } from "../../../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { IController } from "../../../contracts/IController";
import { TableServiceGui } from "../../../services/TableServiceGui";
import { OpenTableCardTemplate, OpenTableCardTemplateElements } from "../../../templates/open-tables/OpenTableCardTemplate";
import { TableColumnListItemTemplateElements } from "../../../templates/open-tables/TableColumnListItemTemplate";
import { domGetClass, domGetElementOrParentWithClassName } from "../../../utilities/DomUtility";
import { OpenTableColumnDefinitionItem } from "./OpenTableColumnDefinitionItem";
import { OpenTablesCardItem } from "./OpenTablesCardItem";
import { createEmptyOpenTablesCardItem } from "./OpenTablesRoutines";


class OpenTablesElements
{
    public readonly listClass = `open-table-cards`;
    public readonly containerClass = `${this.listClass}-container`;
}

const ELE = new OpenTablesElements();
const CARD = new OpenTableCardTemplateElements();
const ITEM = new TableColumnListItemTemplateElements();

export class OpenTables implements IController
{
    private _container: HTMLDivElement;
    private _list: HTMLDivElement;
    private _tableService: TableServiceGui;
    private _cardHtmlEngine: OpenTableCardTemplate;

    constructor()
    {
        this._container = domGetClass<HTMLDivElement>(ELE.containerClass);
        this._list = domGetClass<HTMLDivElement>(ELE.listClass, this._container);
        this._tableService = new TableServiceGui();
        this._cardHtmlEngine = new OpenTableCardTemplate();
    }

    public control(): void
    {
        this.addListeners();
    }

    //#region - Event listeners -
    private addListeners(): void
    {
        this.addCloseCardButtonClickListener();
        this.addCopyRowButtonClickListener();
        this.addTableRowClickListener();
        this.addBtnCopyAllRowsClickListener();
        this.addBtnCopySelectedRowsClickListener();
        this.addBtnRefreshClickListener();
        this.addBtnSelectAllRowsClickListener();
        this.addBtnDeselectAllRowsClickListener();
    }

    private addBtnCopyAllRowsClickListener()
    {
        this._list.addEventListener(NativeEventClick, (e) =>
        {
            const card = this.getOpenCardFromEventTargetClass(e, CARD.btnCopyAllRowsClass);
            card?.copyAllRows();
        });
    }
    
    private addBtnCopySelectedRowsClickListener()
    {
        this._list.addEventListener(NativeEventClick, (e) =>
        {
            const card = this.getOpenCardFromEventTargetClass(e, CARD.btnCopySelectedRowsClass);
            card?.copySelectedRows();
        });
    }

    private addBtnRefreshClickListener()
    {
        this._list.addEventListener(NativeEventClick, async (e) =>
        {
            const card = this.getOpenCardFromEventTargetClass(e, CARD.btnRefreshClass);
            await card?.refreshColumns();
        });
    }

    private addBtnSelectAllRowsClickListener()
    {
        this._list.addEventListener(NativeEventClick, (e) =>
        {
            const card = this.getOpenCardFromEventTargetClass(e, CARD.btnSelectAllRows);
            card?.selectAllRows();
        });
    }


    private addBtnDeselectAllRowsClickListener()
    {
        this._list.addEventListener(NativeEventClick, (e) =>
        {
            const card = this.getOpenCardFromEventTargetClass(e, CARD.btnDeselectAllRows);
            card?.deselectAllRows();
        });

    }

    private addCloseCardButtonClickListener()
    {
        this._container.addEventListener(NativeEventClick, (e) =>
        {
            const card = this.getOpenCardFromEventTargetClass(e, CARD.btnCloseClass);
            card?.closeCard();
        });
    }

    private addCopyRowButtonClickListener()
    {
        this._container.addEventListener(NativeEventClick, (e) =>
        {
            const btnCopyRow = domGetElementOrParentWithClassName(e.target, ITEM.btnCopyClass);
            if (btnCopyRow)
            {
                const tableRow = new OpenTableColumnDefinitionItem(btnCopyRow);
                tableRow.copyRow();
            }
        });
    }

    private addTableRowClickListener()
    {
        this._container.addEventListener(NativeEventClick, (e) =>
        {
            const row = domGetElementOrParentWithClassName(e.target, ITEM.containerClass);
            if (row)
            {
                const tableRow = new OpenTableColumnDefinitionItem(row);
                tableRow.isActive = !tableRow.isActive;
            }
        });
    }
    //#endregion


    public async showTable(data: TableColumnsRequestData): Promise<void>
    {
        const newItem = createEmptyOpenTablesCardItem(data, this._list);
        await newItem.refreshColumns();
    }


    
    private getOpenCardFromEventTargetClass(e: Event, childClass: string): OpenTablesCardItem | null
    {
        const childElement = domGetElementOrParentWithClassName(e.target, childClass);
        if (childElement)
        {
            return new OpenTablesCardItem(childElement);
        }
        return null;
    }
}



