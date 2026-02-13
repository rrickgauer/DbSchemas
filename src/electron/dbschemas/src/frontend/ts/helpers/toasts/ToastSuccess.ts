import { ToastBase } from "./ToastBase";
import { ToastData } from "./ToastData";
import { ToastType } from "./ToastType";


export class ToastSuccess extends ToastBase {
    public readonly toastType = ToastType.SUCCESS;

    constructor(data: ToastData) {
        super(data.message, data.title ?? "Success");
    }
}
