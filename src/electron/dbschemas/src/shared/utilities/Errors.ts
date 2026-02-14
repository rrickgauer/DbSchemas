import { ApiForbiddenException } from "../domain/errors/ApiForbiddenException";
import { ApiNotFoundException } from "../domain/errors/ApiNotFoundException";

export type OnExceptionCallbacks = {
    onApiNotFoundException?: (error: ApiNotFoundException) => void;
    onApiForbiddenException?: (error: ApiForbiddenException) => void;
    onOther?: (error: Error) => void;
}

export function handleApiResponseException(error: Error, callbacks: OnExceptionCallbacks)
{
    if (error instanceof ApiNotFoundException && callbacks.onApiNotFoundException != null)
    {
        callbacks.onApiNotFoundException(error);
        return;
    }

    if (error instanceof ApiForbiddenException && callbacks.onApiForbiddenException != null)
    {
        callbacks?.onApiForbiddenException(error);
        return;
    }

    if (callbacks.onOther != null)
    {
        callbacks.onOther(error);
        return;
    }
}