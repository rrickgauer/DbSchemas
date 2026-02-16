import { HTTP_RESPONSE_NO_CONTENT, HTTP_RESPONSE_NOT_FOUND } from "../../domain/constants/HttpResponses";
import { HttpStatusCode } from "../../domain/enums/HttpStatusCode";
import { ServiceResponse } from "../../domain/ServiceResponses/ServiceResponse";
import { ServiceResponseBase } from "../../domain/ServiceResponses/ServiceResponseBase";
import { isNull } from "../../utilities/nullable";
import { OneWayMapper } from "./basic-mappers";


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
