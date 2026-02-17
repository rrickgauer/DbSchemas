
import { Guid } from "../../../../shared/domain/types/CustomTypes";
import { getRandomGuid } from "../../../../shared/utilities/GuidUtility";
import { ToastType } from "./ToastType";

export abstract class ToastBase
{
    public readonly id: Guid = getRandomGuid();
    public title: string;
    public message: string;

    public abstract toastType: ToastType;

    constructor(message: string, title: string)
    {
        this.message = message;
        this.title = title;
    }
}
