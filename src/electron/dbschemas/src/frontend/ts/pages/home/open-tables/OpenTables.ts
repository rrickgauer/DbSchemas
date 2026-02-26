import { NativeEventClick, NativeEventDragEnd, NativeEventDragOver, NativeEventDragStart, NativeEventDrop } from "../../../../../shared/domain/constants/NativeEvents";
import { TableColumnsRequestData } from "../../../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { IpcEventArgsFilterTableColumn } from "../../../../../shared/domain/models/ipc-event-args/IpcEventArgs";
import { IController } from "../../../contracts/IController";
import { FilterOpenTableColumnsMessage, ShowAllOpenTableColumnsMessage } from "../../../domain/messages/CustomMessages";
import { ipcGetCurrentColumnFilters } from "../../../helpers/ipc/IpcHandler";
import { toastShowSuccess } from "../../../helpers/toasts/ToastUtility";
import { TableServiceGui } from "../../../services/TableServiceGui";
import { OpenTableCardTemplate, OpenTableCardTemplateElements } from "../../../templates/open-tables/OpenTableCardTemplate";
import { TableColumnListItemTemplateElements } from "../../../templates/open-tables/TableColumnListItemTemplate";
import { copyToClipboard } from "../../../utilities/ClipboardUtility";
import { domGetClass, domGetClasses, domGetElementOrParentWithClassName, domIsElement } from "../../../utilities/DomUtility";
import { sessionSaveOpenTables } from "../../../utilities/SessionUtility";
import { createEmptyOpenTablesCardItem, getAllOpenTableCardItems } from "../HomePageRoutines";
import { OpenTableColumnDefinitionItem } from "./OpenTableColumnDefinitionItem";
import { OpenTablesCardItem } from "./OpenTablesCardItem";

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
    private readonly _container: HTMLDivElement;
    private readonly _list: HTMLDivElement;
    private readonly _tableService: TableServiceGui;
    private readonly _cardHtmlEngine: OpenTableCardTemplate;
    private _draggedCard: HTMLElement | null;

    constructor()
    {
        this._container = domGetClass<HTMLDivElement>(ELE.containerClass);
        this._list = domGetClass<HTMLDivElement>(ELE.listClass, this._container);
        this._tableService = new TableServiceGui();
        this._cardHtmlEngine = new OpenTableCardTemplate();
        this._draggedCard = null;
    }

    public control(): void
    {
        this.addListeners();
    }

    //#region - Event listeners -
    private addListeners(): void
    {
        this.addListener_CloseCardButtonClick();
        this.addListener_CopyRowButtonClick();
        this.addListener_TableRowClick();
        this.addListener_BtnCopyAllRowsClick();
        this.addListener_BtnCopySelectedRowsClick();
        this.addListener_BtnRefreshClick();
        this.addListener_BtnSelectAllRowsClick();
        this.addListener_BtnDeselectAllRowsClick();
        this.addListener_FilterOpenTableColumnsMessage();
        this.addListener_ShowAllOpenTableColumnsMessage();
        this.addListener_Dragging();
    }

    private addListener_BtnCopyAllRowsClick()
    {
        this._list.addEventListener(NativeEventClick, (e) =>
        {
            const card = this.getOpenCardFromEventTargetClass(e, CARD.btnCopyAllRowsClass);
            card?.copyAllRows();
        });
    }

    private addListener_BtnCopySelectedRowsClick()
    {
        this._list.addEventListener(NativeEventClick, (e) =>
        {
            const card = this.getOpenCardFromEventTargetClass(e, CARD.btnCopySelectedRowsClass);
            card?.copySelectedRows();
        });
    }

    private addListener_BtnRefreshClick()
    {
        this._list.addEventListener(NativeEventClick, async (e) =>
        {
            const card = this.getOpenCardFromEventTargetClass(e, CARD.btnRefreshClass);
            await card?.refreshColumns();
        });
    }

    private addListener_BtnSelectAllRowsClick()
    {
        this._list.addEventListener(NativeEventClick, (e) =>
        {
            const card = this.getOpenCardFromEventTargetClass(e, CARD.btnSelectAllRows);
            card?.selectAllRows();
        });
    }


    private addListener_BtnDeselectAllRowsClick()
    {
        this._list.addEventListener(NativeEventClick, (e) =>
        {
            const card = this.getOpenCardFromEventTargetClass(e, CARD.btnDeselectAllRows);
            card?.deselectAllRows();
        });
    }

    private addListener_CloseCardButtonClick()
    {
        this._container.addEventListener(NativeEventClick, (e) =>
        {
            const card = this.getOpenCardFromEventTargetClass(e, CARD.btnCloseClass);
            card?.closeCard();
        });
    }

    private addListener_CopyRowButtonClick()
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

    private addListener_TableRowClick()
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

    private addListener_FilterOpenTableColumnsMessage(): void
    {
        FilterOpenTableColumnsMessage.addListener((message) =>
        {
            const data = message.data;
            if (data != null)
            {
                this.filterOpenTableColumns(data);
            }
        });
    }

    private addListener_ShowAllOpenTableColumnsMessage(): void
    {
        ShowAllOpenTableColumnsMessage.addListener((message) =>
        {
            getAllOpenTableCardItems().forEach(i => i.clearColumnFilters());
        });
    }

    private addListener_Dragging(): void
    {
        this._container.addEventListener(NativeEventDragStart, (event) =>
        {
            const draggedElement = domGetElementOrParentWithClassName(event.target, CARD.dragItem);
            const cardElement = this.getParentCardHtmlElementFromEvent(event);
            if (draggedElement && cardElement)
            {
                event.stopPropagation();
                this._draggedCard = cardElement;
                this._draggedCard.classList.add('dragging');
                event.dataTransfer!.effectAllowed = "move";
                event.dataTransfer!.setDragImage(cardElement, 0, 0);
            }
        });

        this._container.addEventListener(NativeEventDragOver, (event) =>
        {
            const cardElement = this.getParentCardHtmlElementFromEvent(event);
            if (cardElement)
            {
                event.preventDefault();
                event.stopPropagation();
                event!.dataTransfer!.effectAllowed = "move";
            }
        });


        this._container.addEventListener(NativeEventDragEnd, (event) =>
        {
            const cardElement = this.getParentCardHtmlElementFromEvent(event);
            cardElement?.classList.remove('dragging');
        });

        this._container.addEventListener(NativeEventDrop, (event) =>
        {
            const droppedCard = this.getParentCardHtmlElementFromEvent(event);
            if (!this._draggedCard || !droppedCard)
            {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            const cardElements = domGetClasses<HTMLElement>(CARD.containerClass, this._container);
            const droppedIndex = cardElements.indexOf(droppedCard);

            if (droppedIndex === cardElements.length - 1)
            {
                droppedCard.insertAdjacentElement("afterend", this._draggedCard);
            }
            else
            {
                droppedCard.insertAdjacentElement("beforebegin", this._draggedCard);
            }

            this.cacheOpenTableOrder();
        });
    }

    private getParentCardHtmlElementFromEvent(event: Event): HTMLElement | null
    {
        if (!domIsElement(event.target))
        {
            return null;
        }

        return event.target.closest<HTMLElement>(`.${CARD.containerClass}`);
    }

    private cacheOpenTableOrder(): void
    {
        const cardItems = getAllOpenTableCardItems().map(c => c.getConnectionTableRequestData());
        sessionSaveOpenTables(cardItems);
    }




    //#endregion

    public async showTables(tableInfos: TableColumnsRequestData[]): Promise<void>
    {
        this.removeAllCardItems();

        const cards = tableInfos.map(t => createEmptyOpenTablesCardItem(t, this._list));

        for (const tableItem of cards)
        {
            await tableItem.refreshColumns();
        }

        const openTableColumns = await ipcGetCurrentColumnFilters();
        openTableColumns?.forEach((item) => this.filterOpenTableColumns(item));
    }

    private removeAllCardItems(): void
    {
        getAllOpenTableCardItems().forEach(c => c.remove());
    }

    public async showTable(tableInfo: TableColumnsRequestData): Promise<void>
    {
        const newItem = createEmptyOpenTablesCardItem(tableInfo, this._list);
        await newItem.refreshColumns();
    }

    private filterOpenTableColumns(filter: IpcEventArgsFilterTableColumn): void
    {
        getAllOpenTableCardItems().forEach(c =>
        {
            c.filterColumns(filter);
        });
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


    public copyAll(): void
    {
        let text = '';
        let isFirst = true;
        const openTables = getAllOpenTableCardItems();
        for (const table of openTables)
        {
            if (isFirst)
            {
                isFirst = false;
                text = table.getClipboardText();
            }
            else
            {
                text += `\n\n${table.getClipboardText()}`;
            }
        }

        copyToClipboard(text);
        toastShowSuccess({ message: 'Copied to clipboard' });
    }

    public closeAll(): void
    {
        const openTables = getAllOpenTableCardItems();
        openTables.forEach(t => t.closeCard());
    }

}



