import { TableColumnsRequestData } from "../../../../../shared/domain/models/column-definitions/TableColumnsRequestData";
import { SearchResultsListItemTemplateElements } from "../../../templates/SearchResultsListItemTemplate";
import { domGetClosestClass } from "../../../utilities/DomUtility";
import { getAllSidebarTableListItems } from "../HomePageRoutines";

const ELE = new SearchResultsListItemTemplateElements();

export class SearchModalListItem
{
    private _container: HTMLButtonElement;

    public get isActive(): boolean
    {
        return this._container.classList.contains(ELE.activeClassName);
    }

    public set isActive(value: boolean)
    {
        if (value)
        {
            this._container.classList.add(ELE.activeClassName);
        }
        else
        {
            this._container.classList.remove(ELE.activeClassName);
        }
    }

    public get connectionId(): number
    {
        return parseInt(this._container.getAttribute(ELE.connectionIdAttr)!);
    }

    public get tableName(): string
    {
        return this._container.getAttribute(ELE.tableNameAttr)!;
    }

    constructor(e: Element)
    {
        this._container = domGetClosestClass<HTMLButtonElement>(ELE.containerClass, e);
    }


    public handleClick(): void
    {
        if (this.isActive)
        {
            return;
        }

        this.isActive = true;

        const sidebarItems = getAllSidebarTableListItems();
        const sidebarItem = sidebarItems.find(i => i.isEqual(this.getTableColumnsRequestData()));
        sidebarItem?.showTable();
    }

    private getTableColumnsRequestData(): TableColumnsRequestData
    {
        return {
            connectionId: this.connectionId,
            tableName: this.tableName,
        };
    }
}
