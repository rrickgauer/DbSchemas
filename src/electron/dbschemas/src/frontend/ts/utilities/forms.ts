import { SpinnerButton } from "../helpers/spinner-button/SpinnerButton";



export function formsSetIsDisabled(spinnerButton: SpinnerButton, fieldset: HTMLFieldSetElement, isDisabled: boolean): void
{
    if (isDisabled)
    {
        spinnerButton.spin();
        fieldset.disabled = true;
    }
    else
    {
        spinnerButton.reset();
        fieldset.disabled = false;
    }
}