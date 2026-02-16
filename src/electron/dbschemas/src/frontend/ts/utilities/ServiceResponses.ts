import { ServiceResponse } from "../../../shared/domain/ServiceResponses/ServiceResponse"
import { ServiceResponseBase } from "../../../shared/domain/ServiceResponses/ServiceResponseBase";
import { handleApiResponseException, OnExceptionCallbacks } from "../../../shared/utilities/Errors";
import { toastShowError, toastShowSuccess, toastShowUnexpectedErrorMessage } from "../helpers/toasts/toasts";

type ServiceResponseLike<T = unknown> = | ServiceResponse<T> | ServiceResponseBase;

type ExecuteResult<R> = R extends ServiceResponse<infer T>
        ? T | null
        : R extends ServiceResponseBase
            ? ServiceResponseBase | null
            : never;

type ExecuteServiceCallArgs<R extends ServiceResponseLike> = {
    callback: () => Promise<R>;
    successMessage?: string;
    errorMessage?: string;
    errorCallbacks?: OnExceptionCallbacks;
};


export async function executeServiceCall<T extends ServiceResponseLike>(args: ExecuteServiceCallArgs<T>): Promise<ExecuteResult<T>>
{
    const NULL_RESPONSE = null as ExecuteResult<T>;

    try
    {
        const response = await args.callback();

        if (response.hasError() && args.errorMessage != null)
        {
            toastShowError({
                message: response.errorMessage,
                title: args.errorMessage,
            });

            return NULL_RESPONSE;
        }

        if (args.successMessage != null)
        {
            toastShowSuccess({
                message: args.successMessage,
            });
        }

        if (response instanceof ServiceResponse)
        {
            return response.data;
        }
        else
        {
            return response as ExecuteResult<T>;
        }

        
    }
    catch (error)
    {
        if (args.errorMessage == null)
        {
            return NULL_RESPONSE;
        }

        let defaultCallbacks: OnExceptionCallbacks = args.errorCallbacks ?? {
            onOther: (e) => toastShowUnexpectedErrorMessage(args.errorMessage),
        };

        handleApiResponseException(error, defaultCallbacks);
    }

    return NULL_RESPONSE;
}

