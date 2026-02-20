import { TableColumnsRequestData } from "../../../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { TableSidebarListItemClickedMessage } from "../../../domain/messages/CustomMessages";
import { toastShowStandard } from "../../../helpers/toasts/ToastUtility";
import { TableSidebarListItemTemplateElements } from "../../../templates/connections-sidebar/TableSidebarListItemTemplate";
import { domGetClosestClass } from "../../../utilities/DomUtility";

const ELE = new TableSidebarListItemTemplateElements();

export class SidebarTableListItem
{
    private _container: HTMLLIElement;

    public get connectionId(): number
    {
        return parseInt(this._container.getAttribute(ELE.connectionIdAttr)!);
    }

    public get tableName(): string
    {
        return this._container.getAttribute(ELE.tableNameAttr)!;
    }

    public get isActive(): boolean
    {
        return this._container.classList.contains(ELE.isActiveClass);
    }

    public set isActive(value: boolean)
    {
        if (value)
        {
            this._container.classList.add(ELE.isActiveClass);
        }
        else
        {
            this._container.classList.remove(ELE.isActiveClass);
        }
    }

    constructor(e: Element)
    {
        this._container = domGetClosestClass<HTMLLIElement>(ELE.containerClass, e);
    }

    public isEqual(tableData: TableColumnsRequestData): boolean
    {
        if (tableData.connectionId != this.connectionId)
        {
            return false;
        }
        if (tableData.tableName != this.tableName)
        {
            return false;
        }
        return true;
    }

    public showTable(): void
    {
        if (this.isActive)
        {
            return;
        }

        this.isActive = true;

        TableSidebarListItemClickedMessage.invoke(this, {
            isActive: this.isActive,
            tableRequestData: this.getTableColumnsRequestData(),
        });
    }

    public getTableColumnsRequestData(): TableColumnsRequestData
    {
        return {
            connectionId: this.connectionId,
            tableName: this.tableName,
        };
    }
}
