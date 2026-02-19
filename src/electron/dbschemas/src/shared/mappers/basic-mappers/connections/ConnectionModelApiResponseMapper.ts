import { ConnectionApiResponse } from "../../../domain/models/connections/ConnectionApiResponse";
import { ConnectionModel } from "../../../domain/models/connections/ConnectionModel";
import { datesToIso, datesParseString } from "../../../utilities/DatesUtility";
import { TwoWayMapper } from "../TwoWayMapper";



export class ConnectionModelApiResponseMapper extends TwoWayMapper<ConnectionModel, ConnectionApiResponse>
{
    protected isInput(payload: any): payload is ConnectionModel
    {
        return payload instanceof ConnectionModel;
    }

    protected toOutput(payload: ConnectionModel): ConnectionApiResponse
    {
        return {
            id: payload.id,
            name: payload.name,
            connectionType: payload.connectionType,
            createdOn: datesToIso(payload.createdOn),
            databaseName: payload.databaseName,
            host: payload.host,
            file: payload.file,
            username: payload.username,
            password: payload.password,
        };
    }

    protected toInput(payload: ConnectionApiResponse): ConnectionModel
    {
        const result = new ConnectionModel();

        result.id = payload.id;
        result.name = payload.name;
        result.connectionType = payload.connectionType;
        result.createdOn = datesParseString(payload.createdOn);
        result.databaseName = payload.databaseName;
        result.host = payload.host;
        result.file = payload.file;
        result.username = payload.username;
        result.password = payload.password;

        return result;
    }
}
