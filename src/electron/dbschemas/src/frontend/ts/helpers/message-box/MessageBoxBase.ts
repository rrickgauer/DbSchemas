import { Modal } from "bootstrap";
import { MessageBoxType } from "./MessageBoxType";

export abstract class MessageBoxBase {
    protected title?: string;
    protected message: string;

    public abstract messageBoxType: MessageBoxType;
    public abstract element: HTMLDivElement;
    protected abstract defaultTitle: string;

    protected get selector()
    {
        return this.element;
    }

    public get modal(): Modal {
        return Modal.getOrCreateInstance(this.element);
    }

    public get elementTitle(): HTMLElement {
        return this.selector.querySelector('.modal-title')!;
    }

    public get elementContent(): HTMLElement {
        return this.selector.querySelector('.modal-body-content')!;
    }

    constructor(message: string, title?: string) {
        this.message = message;
        this.title = title;
    }


    public show = () => {
        if (this.element == null) {
            alert(`MessageBox: ${this.message ?? ''}`);
            console.error(`The container element has not been set.`);
            return this;
        }

        this.elementTitle.innerText = this.title ?? this.defaultTitle;
        this.elementContent.innerHTML = this.message ?? '';

        this.modal.show();

        return this;
    };

    public close = () => {
        this.modal.hide();
        return this;
    };

    protected setTitle = (title?: string) => {
        this.title = title ?? this.defaultTitle;
    };

}
