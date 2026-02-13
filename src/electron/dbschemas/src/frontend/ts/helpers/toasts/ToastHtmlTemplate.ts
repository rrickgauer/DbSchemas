import { NotImplementedException } from "../../../../shared/domain/errors/NotImplementedException";
import { HtmlTemplate } from "../../templates/HtmlTemplate";
import { ToastBase } from "./ToastBase";
import { ToastType } from "./ToastType";


export class ToastHtmlTemplate extends HtmlTemplate<ToastBase>
{
    public toHtml = (data: ToastBase) =>
    {
        let fillColor = this.getColor(data.toastType);

        let html = //html 
            `
            <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" data-js-toast-id="${data.id}">
                <div class="toast-header">
                    <svg class="bd-placeholder-img rounded me-2" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <rect width="100%" height="100%" fill="${fillColor}"></rect>
                    </svg>

                    <strong class="me-auto">${data.title}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">${data.message}</div>
            </div>

        `;

        return html;
    };


    private getColor = (toastType: ToastType) =>
    {
        switch (toastType)
        {
            case ToastType.STANDARD:
                return '#007aff';
            case ToastType.SUCCESS:
                return '#198754';
            case ToastType.ERROR:
                return '#DC3545';
            default:
                throw new NotImplementedException();
        }
    };
}
