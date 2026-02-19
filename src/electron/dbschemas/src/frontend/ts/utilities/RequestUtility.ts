import { HttpMethods } from "../../../shared/domain/constants/HttpMethods";

const HeadersJson = {
    "Content-Type": 'application/json',
}


/**
 * Send a json HTTP request
 */
export async function sendJsonApiRequest<T>(url: string, args: { data: T, method: HttpMethods }): Promise<Response>
{
    return await fetch(url, {
        body: JSON.stringify(args.data),
        method: args.method,
        headers: HeadersJson,
    });
}
