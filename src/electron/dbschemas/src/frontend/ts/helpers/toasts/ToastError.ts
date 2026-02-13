import { ToastBase } from "./ToastBase";
import { ToastData } from "./ToastData";
import { ToastType } from "./ToastType";


export class ToastError extends ToastBase {
    public readonly toastType = ToastType.ERROR;

    constructor(data: ToastData) {
        super(data.message, data.title ?? "Error");
    }
}
