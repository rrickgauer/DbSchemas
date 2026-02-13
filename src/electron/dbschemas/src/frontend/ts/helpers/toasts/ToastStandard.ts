import { ToastBase } from "./ToastBase";
import { ToastData } from "./ToastData";
import { ToastType } from "./ToastType";


export class ToastStandard extends ToastBase {
    public readonly toastType = ToastType.STANDARD;

    constructor(data: ToastData) {
        super(data.message, data.title ?? "Message");
    }
}
