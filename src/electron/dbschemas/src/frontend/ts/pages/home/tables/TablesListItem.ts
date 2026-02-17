import { TableColumnsRequestData } from "../../../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { TableSidebarListItemClickedMessage } from "../../../domain/messages/CustomMessages";
import { TableServiceGui } from "../../../services/TableServiceGui";
import { TableListItemTemplateElements } from "../../../templates/TableListItemTemplate";
import { domGetClass, domGetClosestClass } from "../../../utilities/DomUtility";


const ELE = new TableListItemTemplateElements();

export class TablesListItem
{
    private _container: HTMLLIElement;
    private _tableService: TableServiceGui;

    public get connectionId(): number
    {
        return parseInt(this._container.getAttribute(ELE.connectionIdAttr)!);
    }

    public get tableName(): string
    {
        return domGetClass<HTMLSpanElement>(ELE.tableNameClass, this._container).innerText;
    }

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

    public isSameTableColumnsRequestData(data: TableColumnsRequestData): boolean
    {
        if (data.connectionId != this.connectionId)
        {
            return false;
        }
        if (data.tableName != this.tableName)
        {
            return false;
        }

        return true;
    }

    constructor(e: Element)
    {
        this._container = domGetClosestClass<HTMLLIElement>(ELE.containerClass, e);
        this._tableService = new TableServiceGui();
    }

    public openTable(): void
    {
        if (this.isActive)
        {
            return;
        }

        this.isActive = true;

        TableSidebarListItemClickedMessage.invoke(this, {
            isActive: this.isActive,
            tableRequestData: {
                connectionId: this.connectionId,
                tableName: this.tableName,
            },
        });
    }
}
