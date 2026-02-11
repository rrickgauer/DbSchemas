import { NativeEventSubmit } from "../../../../../shared/domain/constants/native-events";
import { IController } from "../../../contracts/IController";
import { FormInputSelect } from "../../../helpers/form-inputs/FormInputSelect";
import { FormInputText } from "../../../helpers/form-inputs/FormInputText";
import { SpinnerButton } from "../../../helpers/spinner-button/SpinnerButton";
import { bootstrapShowModal } from "../../../utilities/bootstrap";
import { domGetClass, domGetFormInputById, domQuery } from "../../../utilities/dom";

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
    private _container: HTMLDivElement;
    private _form: HTMLFormElement;
    private _inputConnectionName: FormInputText;
    private _inputDatabaseName: FormInputText;
    private _inputHost: FormInputText;
    private _inputFile: FormInputText;
    private _inputPassword: FormInputText;
    private _inputConnectionType: FormInputSelect<unknown>;
    private _btnSubmit: SpinnerButton;
    private _fieldset: HTMLFieldSetElement;


    constructor()
    {
        this._container = domGetClass<HTMLDivElement>(ELE.containerClass);

        this._form = domGetClass<HTMLFormElement>(ELE.formClass, this._container);

        this._inputConnectionName = domGetFormInputById(ELE.inputNameId, FormInputText);
        this._inputConnectionType = domGetFormInputById(ELE.inputTypeId, FormInputSelect);
        this._inputDatabaseName = domGetFormInputById(ELE.inputDatabaseNameId, FormInputText);
        this._inputHost = domGetFormInputById(ELE.inputHostId, FormInputText);
        this._inputFile = domGetFormInputById(ELE.inputFileId, FormInputText);
        this._inputConnectionName = domGetFormInputById(ELE.inputUsernameId, FormInputText);
        this._inputPassword = domGetFormInputById(ELE.inputPasswordId, FormInputText);
        this._btnSubmit = new SpinnerButton(domGetClass('btn-submit', this._container));
        this._fieldset = domQuery<HTMLFieldSetElement>('fieldset', this._container);
    }

    public control(): void
    {
        this.addListeners();
    }

    private addListeners()
    {
        this._form.addEventListener(NativeEventSubmit, async (e) =>
        {
            e.preventDefault();
            this._btnSubmit.spin();
        });
    }

    public show(): void
    {
        bootstrapShowModal(this._container);
    }
}