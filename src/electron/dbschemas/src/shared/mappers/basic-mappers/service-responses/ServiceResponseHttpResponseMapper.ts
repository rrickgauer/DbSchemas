import { HTTP_RESPONSE_NOT_FOUND } from "../../../domain/constants/HttpResponses";
import { HttpStatusCode } from "../../../domain/enums/HttpStatusCode";
import { ServiceResponse } from "../../../domain/ServiceResponses/ServiceResponse";
import { isNull } from "../../../utilities/NullableUtility";
import { OneWayMapper } from "../OneWayMapper";

export class ServiceResponseHttpResponseMapper extends OneWayMapper<ServiceResponse<any>, Response>
{
    protected mapModel(serviceResponse: ServiceResponse<any>): Response
    {
        if (serviceResponse.hasError())
        {
            return new Response(serviceResponse.errorMessage, {
                status: HttpStatusCode.BadRequest,
            });
        }

        if (isNull(serviceResponse.data))
        {
            return HTTP_RESPONSE_NOT_FOUND;
        }

        const body = JSON.stringify(serviceResponse.data);
        return new Response(body);
    }
}
