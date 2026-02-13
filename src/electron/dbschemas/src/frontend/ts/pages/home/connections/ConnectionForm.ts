import { ConnectionService } from "../../../../../backend/services/connections/ConnectionService";
import { NativeEventSubmit } from "../../../../../shared/domain/constants/native-events";
import { ConnectionType } from "../../../../../shared/domain/enums/ConnectionType";
import { ConnectionApiRequestForm } from "../../../../../shared/domain/models/connections/ConnectionApiRequestForm";
import { ConnectionModel } from "../../../../../shared/domain/models/connections/ConnectionModel";
import { IController } from "../../../contracts/IController";
import { FormInput } from "../../../helpers/form-inputs/FormInput";
import { FormInputSelect, FormInputSelectNumber } from "../../../helpers/form-inputs/FormInputSelect";
import { FormInputText } from "../../../helpers/form-inputs/FormInputText";
import { SpinnerButton } from "../../../helpers/spinner-button/SpinnerButton";
import { ConnectionsServiceGui } from "../../../services/ConnectionsServiceGui";
import { bootstrapShowModal } from "../../../utilities/bootstrap";
import { domGetClass, domGetFormInputById, domQuery } from "../../../utilities/dom";
import { formsSetIsDisabled as formsToggleIsDisabled } from "../../../utilities/forms";
import { executeServiceCall } from "../../../utilities/ServiceResponses";

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
}

const ELE = new ConnectionFormElements();

export class ConnectionForm implements IController
{
    private readonly _container: HTMLDivElement;
    private readonly _form: HTMLFormElement;
    private readonly _inputConnectionName: FormInputText;
    private readonly _inputDatabaseName: FormInputText;
    private readonly _inputHost: FormInputText;
    private readonly _inputFile: FormInputText;
    private readonly _inputPassword: FormInputText;
    private readonly _inputConnectionType: FormInputSelect<string>;
    private readonly _btnSubmit: SpinnerButton;
    private readonly _fieldset: HTMLFieldSetElement;
    private readonly _inputUsername: FormInputText;
    private _connectionService: ConnectionsServiceGui;
    
    private get _selectedConnectionType(): ConnectionType
    {
        const value = this._inputConnectionType.value!;
        return parseInt(value);
    }

    private set _selectedConnectionType(value: ConnectionType)
    {
        this._inputConnectionType.value = `${value}`;
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
        this._btnSubmit = new SpinnerButton(domGetClass('btn-submit', this._container));
        this._fieldset = domQuery<HTMLFieldSetElement>('fieldset', this._container);
        this._connectionService = new ConnectionsServiceGui();
    }

    public show(): void
    {
        bootstrapShowModal(this._container);
    }

    public control(): void
    {
        this.addListeners();
    }

    private addListeners(): void
    {
        this.addFormSubmitListener();
    }

    private addFormSubmitListener(): void
    {
        this._form.addEventListener(NativeEventSubmit, async (e) =>
        {
            e.preventDefault();
            await this.onFormSubmit();
        });
    }

    private async onFormSubmit(): Promise<void>
    {
        const formData = this.getValidatedFormData();
        if (!formData)
        {
            return;
        }

        formsToggleIsDisabled(this._btnSubmit, this._fieldset, true);

        const newConnection = await this.sendFormApiRequest(formData);

        formsToggleIsDisabled(this._btnSubmit, this._fieldset, false);


    }

    private async sendFormApiRequest(formData: ConnectionApiRequestForm): Promise<ConnectionModel | null>
    {
        return await executeServiceCall({
            callback: () => this._connectionService.createConnection(formData),
            errorMessage: `Connection not created`,
            successMessage: `Connection created successfully`,
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
        this.getFormInputs().forEach((formInput) => formInput.clearValidation());
    }

    private clearInputValues(): void
    {
        this.getFormInputs().forEach((input) => input.value = null);
        this._selectedConnectionType = ConnectionType.MySQL;
    }

    private getFormInputs(): FormInput<any | null>[]
    {
        return [
            this._inputConnectionName,
            this._inputConnectionType,
            this._inputDatabaseName,
            this._inputHost,
            this._inputFile,
            this._inputUsername,
            this._inputPassword,
        ]
    }

}