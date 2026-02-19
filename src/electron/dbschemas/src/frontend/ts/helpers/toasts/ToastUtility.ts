import { Toast } from "bootstrap";
import { ToastError } from "./ToastError";
import { ToastSuccess } from "./ToastSuccess";
import { ToastStandard } from "./ToastStandard";
import { ToastBase } from "./ToastBase";
import { ToastData } from "./ToastData";
import { ToastHtmlTemplate } from "./ToastHtmlTemplate";

export const ToastsContainer = document.querySelector('#toasts-wrapper .toast-container') as HTMLDivElement;

export function toastShowError(data: ToastData)
{
    const toast = new ToastError(data);
    return toastShow(toast);
}

export function toastShowSuccess(data: ToastData)
{
    const toast = new ToastSuccess(data);
    return toastShow(toast);
}

export function toastShowStandard(data: ToastData)
{
    const toast = new ToastStandard(data);
    return toastShow(toast);
}

export function toastShowUnexpectedErrorMessage(title?: string)
{
    return toastShowError({
        message: 'Unexpected error. Please reload the page and try again.',
        title: title,
    });
}

export function toastShow(toast: ToastBase)
{
    const template = new ToastHtmlTemplate();

    const html = template.toHtml(toast);

    ToastsContainer.insertAdjacentHTML("afterbegin", html);

    const element = document.querySelector(`.toast[data-js-toast-id="${toast.id}"]`);

    Toast.getOrCreateInstance(element!).show();

    return toast;

}
