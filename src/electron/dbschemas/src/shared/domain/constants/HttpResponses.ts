import { HttpStatusCode } from '../enums/HttpStatusCode';


export const HTTP_RESPONSE_NOT_FOUND = new Response('Not Found', { status: HttpStatusCode.NotFound });

