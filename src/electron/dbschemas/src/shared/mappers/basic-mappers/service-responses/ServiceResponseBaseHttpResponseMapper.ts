import { HTTP_RESPONSE_NO_CONTENT } from "../../../domain/constants/HttpResponses";
import { HttpStatusCode } from "../../../domain/enums/HttpStatusCode";
import { ServiceResponseBase } from "../../../domain/ServiceResponses/ServiceResponseBase";
import { OneWayMapper } from "../OneWayMapper";



export class ServiceResponseBaseHttpResponseMapper extends OneWayMapper<ServiceResponseBase, Response>
{
    protected mapModel(serviceResponse: ServiceResponseBase): Response
    {
        if (serviceResponse.hasError())
        {
            return new Response(serviceResponse.errorMessage, {
                status: HttpStatusCode.BadRequest,
            });
        }

        return HTTP_RESPONSE_NO_CONTENT;
    }
}
