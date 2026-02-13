import { getRandomGuid } from "../../utility/guid";
import { ToastType } from "./ToastType";


export abstract class ToastBase {
    public readonly id: string = getRandomGuid();

    public title: string;
    public message: string;

    public abstract toastType: ToastType;

    constructor(message: string, title: string) {
        this.message = message;
        this.title = title;
    }
}
