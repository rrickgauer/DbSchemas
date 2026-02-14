import { ServiceResponse } from "../../../shared/domain/ServiceResponses/ServiceResponse"
import { handleApiResponseException, OnExceptionCallbacks } from "../../../shared/utilities/Errors";
import { toastShowError, toastShowSuccess, toastShowUnexpectedErrorMessage } from "../helpers/toasts/toasts";

type executeServiceCallArgs<T> = {
    callback(): Promise<ServiceResponse<T>>;
    successMessage?: string;
    errorMessage?: string;
    errorCallbacks?: OnExceptionCallbacks;
}

export async function executeServiceCall<T>(args: executeServiceCallArgs<T>): Promise<T | null>
{
    try
    {
        const response = await args.callback();

        if (response.hasError() && args.errorMessage != null)
        {
            toastShowError({
                message: response.errorMessage,
                title: args.errorMessage,
            });

            return null;
        }

        if (args.successMessage != null)
        {
            toastShowSuccess({
                message: args.successMessage,
            });
        }

        return response.data;
    }
    catch (error)
    {
        if (args.errorMessage == null)
        {
            return null;
        }

        let defaultCallbacks: OnExceptionCallbacks = args.errorCallbacks ?? {
            onOther: (e) => toastShowUnexpectedErrorMessage(args.errorMessage),
        };

        handleApiResponseException(error, defaultCallbacks);
    }

    return null;
}

