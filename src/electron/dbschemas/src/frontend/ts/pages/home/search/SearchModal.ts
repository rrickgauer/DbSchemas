import { NativeEventClick, NativeEventSubmit } from "../../../../../shared/domain/constants/NativeEvents";
import { NotImplementedException } from "../../../../../shared/domain/errors/NotImplementedException";
import { IController } from "../../../contracts/IController";
import { ShowSearchModalMessage } from "../../../domain/messages/CustomMessages";
import { FormInputText } from "../../../helpers/form-inputs/FormInputText";
import { SpinnerButton } from "../../../helpers/spinner-button/SpinnerButton";
import { SearchResultsListItemTemplate, SearchResultsListItemTemplateArgs, SearchResultsListItemTemplateElements } from "../../../templates/SearchResultsListItemTemplate";
import { bootstrapShowModal } from "../../../utilities/BootstrapUtility";
import { domFocusInput, domGetClass, domGetElementOrParentWithClassName, domGetFormInputById, domGetSpinnerButton, domQuery } from "../../../utilities/DomUtility";
import { formsSetIsDisabled } from "../../../utilities/FormUtility";
import { getAllOpenTableCardItems, getAllSidebarTableListItems, getSidebarConnectionNameMap } from "../HomePageRoutines";
import { SidebarTableListItem } from "../sidebar/SidebarTableListItem";
import { SearchModalListItem } from "./SearchModalListItem";

class SearchModalElements
{
    public readonly formClass = `form-search`;
    public readonly containerClass = `${this.formClass}-container`;
    public readonly inputSearchId = `${this.formClass}-input-search`;
    public readonly resultsClass = `${this.formClass}-results`;
}

const ELE = new SearchModalElements();
const ITEM = new SearchResultsListItemTemplateElements();

export class SearchModal implements IController
{
    private readonly _container: HTMLDivElement;
    private readonly _form: HTMLFormElement;
    private readonly _inputSearch: FormInputText;
    private readonly _btnSubmit: SpinnerButton;
    private readonly _fieldset: HTMLFieldSetElement;
    private readonly _resultsList: HTMLDivElement;
    private readonly _htmlEngine: SearchResultsListItemTemplate;

    constructor()
    {
        this._container = domGetClass<HTMLDivElement>(ELE.containerClass);
        this._form = domGetClass<HTMLFormElement>(ELE.formClass, this._container);
        this._inputSearch = domGetFormInputById(ELE.inputSearchId, FormInputText);
        this._btnSubmit = domGetSpinnerButton(this._form);
        this._fieldset = domQuery<HTMLFieldSetElement>('fieldset', this._container);
        this._resultsList = domGetClass<HTMLDivElement>(ELE.resultsClass, this._container);
        this._htmlEngine = new SearchResultsListItemTemplate();
    }

    public control(): void
    {
        this.addListeners();
    }

    //#region - Event listeners -
    private addListeners(): void
    {
        this.addListener_ShowSearchModalMessage();
        this.addListener_FormSubmit();

        this._resultsList.addEventListener(NativeEventClick, (e) =>
        {
            const listItem = domGetElementOrParentWithClassName(e.target, ITEM.containerClass);
            if (listItem)
            {
                const searchItem = new SearchModalListItem(listItem);
                searchItem.handleClick();
            }
        });
    }

    private addListener_ShowSearchModalMessage(): void
    {
        ShowSearchModalMessage.addListener((message) =>
        {
            this.showModal();
        });
    }

    private addListener_FormSubmit(): void
    {
        this._form.addEventListener(NativeEventSubmit, (e) =>
        {
            e.preventDefault();
            this.onFormSubmit();
        });
    }
    //#endregion


    private showModal(): void
    {
        bootstrapShowModal(this._container);
        domFocusInput(this._inputSearch.input);
    }


    private onFormSubmit(): void
    {
        const searchValue = this.getValidatedFormInputValues();
        if (searchValue == null)
        {
            return;
        }

        formsSetIsDisabled(this._btnSubmit, this._fieldset, true);

        const matches = this.getSearchResults(searchValue);
        this.displaySeachResults(matches);

        formsSetIsDisabled(this._btnSubmit, this._fieldset, false);
    }

    private getValidatedFormInputValues(): string | null
    {
        this._inputSearch.clearValidation();

        const textValue = this._inputSearch.value;
        if (textValue == null || textValue.length < 3)
        {
            this._inputSearch.setInvalid('Please enter 3 or more characters');
            return null;
        }

        return textValue;
    }

    private getSearchResults(query: string): SidebarTableListItem[]
    {
        const tableListItems = getAllSidebarTableListItems();

        const matchingItems = tableListItems.filter((item) =>
        {
            return item.tableName.toLowerCase().includes(query.toLowerCase());
        });

        return matchingItems;
    }

    private displaySeachResults(matches: SidebarTableListItem[]): void
    {
        // clear previous search results
        this._resultsList.innerHTML = '';

        const data = this.toHtmlEngineData(matches);
        const html = this._htmlEngine.toHtmls(data);
        this._resultsList.innerHTML = html;
    }

    private toHtmlEngineData(tableItems: SidebarTableListItem[]): SearchResultsListItemTemplateArgs[]
    {
        const connectionNameMap = getSidebarConnectionNameMap();
        const openTables = getAllOpenTableCardItems();

        const isOpen = (item: SidebarTableListItem) =>
        {
            const match = openTables.find(openTable => openTable.isEqual(item.getTableColumnsRequestData()));
            return match != null;
        };

        return tableItems.map(x =>
        {
            return {
                connectionId: x.connectionId,
                connectionName: connectionNameMap.get(x.connectionId)!,
                tableName: x.tableName,
                isActive: isOpen(x),
            };
        });
    }
}


