import { ApiForbiddenException } from "../../../shared/domain/errors/ApiForbiddenException";
import { ApiNotFoundException } from "../../../shared/domain/errors/ApiNotFoundException";
import { ServiceResponseBase } from "../../../shared/domain/ServiceResponses/ServiceResponseBase";
import { ServiceResponse } from "../../../shared/domain/ServiceResponses/ServiceResponse";
import { HttpStatusCode } from "./HttpStatusCode";



export function makeServiceResponse<T>(args: {data?: T | null, errorMessage?: string | null}): ServiceResponse<T>
{
    return new ServiceResponse<T>({
        data: args.data,
        errorMessage: args.errorMessage, 
    });
}

/**
 * Create a new empty service response
 */
export async function toServiceResponseNoContent(response: Response): Promise<ServiceResponseBase>
{
    if (response.ok)
    {
        return new ServiceResponseBase();
    }

    const errorMessage = await response.text();

    switch(response.status as HttpStatusCode)
    {
        case HttpStatusCode.BadRequest:
            return new ServiceResponseBase({errorMessage: errorMessage});

        case HttpStatusCode.NotFound:
            throw new ApiNotFoundException();
            
        case HttpStatusCode.Forbidden:
            throw new ApiForbiddenException();

        default:
            throw new Error(errorMessage);
    }
}

/**
 * Transform an api's response to a service response with data
 */
export async function toServiceResponse<T>(response: Response): Promise<ServiceResponse<T>> 
{
    if (response.ok)
    {
        const data = await response.json();
        return new ServiceResponse<T>({
            data: data,
        });
    }

    const errorMessage = await response.text();

    switch(response.status as HttpStatusCode)
    {
        case HttpStatusCode.BadRequest:
            return new ServiceResponse<T>({errorMessage: errorMessage});

        case HttpStatusCode.NotFound:
            throw new ApiNotFoundException();
            
        case HttpStatusCode.Forbidden:
            throw new ApiForbiddenException();

        default:
            throw new Error(errorMessage);
    }
}



/**
 * Throw custom not found exception 
 */
function handleNotFoundApiResponse(response: Response): void
{
    throw new ApiNotFoundException();
}

/**
 * Throw custom forbidden exception
 */
function handleForbiddenApiResponse(response: Response): void
{
    throw new ApiForbiddenException();
}



