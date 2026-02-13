export class SpinnerButton
{
    private static readonly SpinnerHtml = '<div class="spinner-border spinner-border-sm" role="status"></div>';

    public readonly button: HTMLButtonElement;
    private _displayText: string;

    constructor(button: HTMLButtonElement)
    {
        this.button = button;

        const originalText = button.getAttribute('data-spinner-button-text');

        if (originalText)
        {
            this._displayText = originalText;
        }

        else
        {
            this._displayText = this.button.innerText;
        }
    }

    public spin()
    {
        const width = this.button.offsetWidth;
        this.button.style.minWidth = `${width}px`;

        this.button.innerHTML = SpinnerButton.SpinnerHtml;

        this.button.disabled = true;
    }

    public reset()
    {
        const text = this.button.dataset.spinnerButtonText ?? this._displayText;

        //this.button.innerText = this._displayText;
        this.button.innerText = text;
        this.button.disabled = false;
    }


    public updateDisplayText(text: string)
    {
        this.button.dataset.spinnerButtonText = text;
        this._displayText = text;
        this.button.innerText = text;

    }
}
