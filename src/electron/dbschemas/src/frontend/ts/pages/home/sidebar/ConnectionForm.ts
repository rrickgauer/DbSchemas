import { NativeEventChange, NativeEventClick, NativeEventSubmit } from "../../../../../shared/domain/constants/NativeEvents";
import { ConnectionType } from "../../../../../shared/domain/enums/ConnectionType";
import { ConnectionApiRequestForm } from "../../../../../shared/domain/models/connections/ConnectionApiRequestForm";
import { ConnectionModel } from "../../../../../shared/domain/models/connections/ConnectionModel";
import { Nullable } from "../../../../../shared/domain/types/CustomTypes";
import { isNull, notNull } from "../../../../../shared/utilities/NullableUtility";
import { IController } from "../../../contracts/IController";
import { ConnectionsListRefreshMessage, ShowConnectionFormMessage } from "../../../domain/messages/CustomMessages";
import { FormInput } from "../../../helpers/form-inputs/FormInput";
import { FormInputSelect } from "../../../helpers/form-inputs/FormInputSelect";
import { FormInputText } from "../../../helpers/form-inputs/FormInputText";
import { SpinnerButton } from "../../../helpers/spinner-button/SpinnerButton";
import { ConnectionsServiceGui } from "../../../services/ConnectionsServiceGui";
import { bootstrapHideElement, bootstrapHideModal, bootstrapShowElement, bootstrapShowModal } from "../../../utilities/BootstrapUtility";
import { domGetClass, domGetFormInputById, domGetSpinnerButton, domQuery } from "../../../utilities/DomUtility";
import { formsSetIsDisabled as formsToggleIsDisabled } from "../../../utilities/FormUtility";
import { executeServiceCall } from "../../../utilities/ServiceUtility";
import { ipcOpenFilePicker as ipcOpenNativeFileDialog } from "../../../helpers/ipc/IpcHandler";
import { toastShowSuccess } from "../../../helpers/toasts/ToastUtility";

class ConnectionFormElements
{
    public readonly formClass = `connection-form`;
    public readonly containerClass = `${this.formClass}-modal`;
    public readonly inputNameId = `${this.formClass}-input-name`;
    public readonly inputTypeId = `${this.formClass}-input-type`;
    public readonly inputDatabaseNameId = `${this.formClass}-input-database-name`;
    public readonly inputHostId = `${this.formClass}-input-host`;
    public readonly inputFileId = `${this.formClass}-input-file`;
    public readonly inputUsernameId = `${this.formClass}-input-username`;
    public readonly inputPasswordId = `${this.formClass}-input-password`;
    public readonly spinner = `${this.formClass}-spinner`;
    public readonly btnSelectFileClass = `${this.formClass}-btn-select-file`;
    public readonly btnShowPasswordClass = `${this.formClass}-btn-show-password`;
    public readonly showPasswordIconClass = `bx-show`;
    public readonly hidePasswordIconClass = `bx-hide`;
}

const ELE = new ConnectionFormElements();

export class ConnectionForm implements IController
{
    private static _singleton: Nullable<ConnectionForm> = null;
    private _activeConnectionId: Nullable<number> = null;
    private readonly _container: HTMLDivElement;
    private readonly _form: HTMLFormElement;
    private readonly _inputConnectionName: FormInputText;
    private readonly _inputDatabaseName: FormInputText;
    private readonly _inputHost: FormInputText;
    private readonly _inputFile: FormInputText;
    private readonly _inputPassword: FormInputText;
    private readonly _inputConnectionType: FormInputSelect<string>;
    private readonly _inputUsername: FormInputText;
    private readonly _btnSubmit: SpinnerButton;
    private readonly _fieldset: HTMLFieldSetElement;
    private readonly _connectionService: ConnectionsServiceGui;
    private readonly _spinner: HTMLDivElement;
    private readonly _btnSelectFile: HTMLButtonElement;
    private readonly _btnShowPassword: HTMLButtonElement;

    private get _selectedConnectionType(): ConnectionType
    {
        const value = this._inputConnectionType.value!;
        return parseInt(value);
    }

    private set _selectedConnectionType(value: ConnectionType)
    {
        this._inputConnectionType.value = `${value}`;
    }

    private get _modalTitle(): string
    {
        return domGetClass<HTMLHeadingElement>('modal-title', this._container).innerText;
    }

    private set _modalTitle(value: string)
    {
        domGetClass<HTMLHeadingElement>('modal-title', this._container).innerText = value;
    }

    private get _isPasswordHidden(): boolean
    {
        return this._inputPassword.input.type == 'password';
    }

    private set _isPasswordHidden(isHidden: boolean)
    {
        const toggleButtonInnerIcon = domGetClass<HTMLElement>('bx', this._btnShowPassword);

        if (isHidden)
        {
            toggleButtonInnerIcon.classList.remove(ELE.hidePasswordIconClass);
            toggleButtonInnerIcon.classList.add(ELE.showPasswordIconClass);
            this._inputPassword.input.type = 'password';
            this._btnShowPassword.title = `Show password`;
        }
        else
        {
            toggleButtonInnerIcon.classList.add(ELE.hidePasswordIconClass);
            toggleButtonInnerIcon.classList.remove(ELE.showPasswordIconClass);
            this._inputPassword.input.type = 'text';
            this._btnShowPassword.title = `Hide password`;
        }
    }

    constructor()
    {
        this._container = domGetClass<HTMLDivElement>(ELE.containerClass);
        this._form = domGetClass<HTMLFormElement>(ELE.formClass, this._container);
        this._inputConnectionName = domGetFormInputById(ELE.inputNameId, FormInputText);
        this._inputConnectionType = domGetFormInputById(ELE.inputTypeId, FormInputSelect<string>);
        this._inputDatabaseName = domGetFormInputById(ELE.inputDatabaseNameId, FormInputText);
        this._inputHost = domGetFormInputById(ELE.inputHostId, FormInputText);
        this._inputFile = domGetFormInputById(ELE.inputFileId, FormInputText);
        this._inputUsername = domGetFormInputById(ELE.inputUsernameId, FormInputText);
        this._inputPassword = domGetFormInputById(ELE.inputPasswordId, FormInputText);
        this._btnSubmit = domGetSpinnerButton(this._container);
        this._fieldset = domQuery<HTMLFieldSetElement>('fieldset', this._container);
        this._connectionService = new ConnectionsServiceGui();
        this._spinner = domGetClass<HTMLDivElement>(ELE.spinner, this._container);
        this._btnSelectFile = domGetClass<HTMLButtonElement>(ELE.btnSelectFileClass, this._container);
        this._btnShowPassword = domGetClass<HTMLButtonElement>(ELE.btnShowPasswordClass, this._container);
    }

    public control(): void
    {
        this.addListeners();
    }

    //#region - Event Listeners -
    private addListeners(): void
    {
        this.addListener_FormSubmit();
        this.addListener_ShowConnectionFormMessage();
        this.addListener_ConnectionTypeChange();
        this.addListener_SelectFileButtonClick();
        this.addListener_ShowPasswordButtonClick();
    }

    private addListener_FormSubmit(): void
    {
        this._form.addEventListener(NativeEventSubmit, async (e) =>
        {
            e.preventDefault();
            await this.onFormSubmit();
        });
    }

    private addListener_ShowConnectionFormMessage(): void
    {
        ShowConnectionFormMessage.addListener(async (data) =>
        {
            this._activeConnectionId = data.data?.connectionId ?? null;
            await this.displayModal();
        });
    }

    private addListener_ConnectionTypeChange(): void
    {
        this._inputConnectionType.input.addEventListener(NativeEventChange, (e) =>
        {
            this.updateInputVisibilities(this._selectedConnectionType);
        });
    }

    private addListener_SelectFileButtonClick(): void
    {
        this._btnSelectFile.addEventListener(NativeEventClick, async (e) =>
        {
            await this.selectFile();
        });
    }

    private addListener_ShowPasswordButtonClick(): void
    {
        this._btnShowPassword.addEventListener(NativeEventClick, (e) =>
        {
            this.togglePasswordVisibility();
        });
    }

    private togglePasswordVisibility(): void
    {
        this._isPasswordHidden = !this._isPasswordHidden;
    }

    //#endregion

    //#region - Display connection modal
    private async displayModal(): Promise<void>
    {
        this.toggleSpinner(true);
        bootstrapShowModal(this._container);

        formsToggleIsDisabled(this._btnSubmit, this._fieldset, false);
        this.clearInputValues();
        this.clearInputValidations();
        this.updateFormTexts(this._activeConnectionId == null);

        if (notNull(this._activeConnectionId))
        {
            await this.loadConnectionDataIntoInputs(this._activeConnectionId);
        }

        this.updateInputVisibilities(this._selectedConnectionType);

        this.toggleSpinner(false);

    }

    private async loadConnectionDataIntoInputs(connectionId: number): Promise<void>
    {
        const connectionData = await executeServiceCall({
            callback: () => this._connectionService.getConnection(connectionId),
            errorMessage: `Unable fetch connection information`,
        });

        if (notNull(connectionData)) 
        {
            this.setInputValues(connectionData);
        }
    }

    private setInputValues(connection: ConnectionModel): void
    {
        this._inputConnectionName.value = connection.name;
        this._selectedConnectionType = connection.connectionType;
        this._inputDatabaseName.value = connection.databaseName;
        this._inputHost.value = connection.host;
        this._inputFile.value = connection.file;
        this._inputUsername.value = connection.username;
        this._inputPassword.value = connection.password;
    }

    private updateFormTexts(isNewConnection: boolean): void
    {
        if (isNewConnection)
        {
            this._modalTitle = 'New Connection';
            this._btnSubmit.updateDisplayText('Create connection');
        }
        else
        {
            this._modalTitle = 'Edit Connection';
            this._btnSubmit.updateDisplayText('Update connection');
        }
    }
    //#endregion

    //#region - Form Submit -
    private async onFormSubmit(): Promise<void>
    {
        const formData = this.getValidatedFormData();
        if (!formData)
        {
            return;
        }

        formsToggleIsDisabled(this._btnSubmit, this._fieldset, true);

        const updatedConnection = await this.sendFormApiRequest(formData);

        formsToggleIsDisabled(this._btnSubmit, this._fieldset, false);

        if (updatedConnection)
        {
            ConnectionsListRefreshMessage.invoke(this, null);
            bootstrapHideModal(this._container);
        }
    }

    private async sendFormApiRequest(formData: ConnectionApiRequestForm): Promise<ConnectionModel | null>
    {
        if (isNull(this._activeConnectionId))
        {
            return await this.createNewConnection(formData);
        }
        else
        {
            return await this.updateConnection(this._activeConnectionId, formData);
        }
    }

    private async createNewConnection(formData: ConnectionApiRequestForm): Promise<ConnectionModel | null>
    {
        return await executeServiceCall({
            callback: () => this._connectionService.createConnection(formData),
            errorMessage: `Connection not created`,
            successMessage: `Connection created successfully`,
        });
    }

    private async updateConnection(connectionId: number, formData: ConnectionApiRequestForm): Promise<ConnectionModel | null>
    {
        return await executeServiceCall({
            callback: () => this._connectionService.saveConnection(connectionId, formData),
            errorMessage: `Changes not saved`,
            successMessage: `Changes saved successfully`,
        });
    }

    private getValidatedFormData(): ConnectionApiRequestForm | null
    {
        this.clearInputValidations();

        let isValid = true;

        if (!this._inputConnectionName.checkForValue('Required'))
        {
            isValid = false;
        }

        if (!isValid)
        {
            return null;
        }

        return {
            name: this._inputConnectionName.value!,
            connectionType: this._selectedConnectionType,
            databaseName: this._inputDatabaseName.value,
            file: this._inputFile.value,
            host: this._inputHost.value,
            password: this._inputPassword.value,
            username: this._inputUsername.value,
        };
    }

    private clearInputValidations(): void
    {
        this.getAllFormInputs().forEach((formInput) => formInput.clearValidation());
    }

    private clearInputValues(): void
    {
        this.getAllFormInputs().forEach((input) => input.value = null);
        this._selectedConnectionType = ConnectionType.MySQL;
    }

    private getAllFormInputs(): FormInput<any | null>[]
    {
        return [
            this._inputConnectionName,
            this._inputConnectionType,
            this._inputDatabaseName,
            this._inputHost,
            this._inputFile,
            this._inputUsername,
            this._inputPassword,
        ];
    }

    private updateInputVisibilities(connectionType: ConnectionType): void
    {
        const inputs = this.getAllFormInputs();
        inputs.forEach((x) => bootstrapShowElement(x.container));

        switch (connectionType)
        {
            case ConnectionType.MySQL:
            case ConnectionType.Postgres:
                bootstrapHideElement(this._inputFile.container);
                break;

            case ConnectionType.SQLite:
                bootstrapHideElement(this._inputDatabaseName.container);
                bootstrapHideElement(this._inputHost.container);
                bootstrapHideElement(this._inputPassword.container);
                bootstrapHideElement(this._inputUsername.container);
                break;

            case ConnectionType.Access:
                bootstrapHideElement(this._inputDatabaseName.container);
                bootstrapHideElement(this._inputHost.container);
                bootstrapHideElement(this._inputUsername.container);
                break;
        }
    }


    //#endregion

    //#region - Misc -
    private toggleSpinner(isSpinnerVisible: boolean)
    {
        if (isSpinnerVisible)
        {
            bootstrapShowElement(this._spinner);
            bootstrapHideElement(this._form);
        }
        else
        {
            bootstrapShowElement(this._form);
            bootstrapHideElement(this._spinner);
        }
    }

    private async selectFile(): Promise<void>
    {
        const selectedFile = await ipcOpenNativeFileDialog();
        if (notNull(selectedFile))
        {
            this._inputFile.value = selectedFile;
        }
    }

    //#endregion

    public static initialize()
    {
        if (!this._singleton)
        {
            this._singleton = new ConnectionForm();
            this._singleton.control();
        }

        return this._singleton;
    }


}