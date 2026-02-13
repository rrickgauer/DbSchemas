
import { ConnectionApiResponse } from "../../domain/models/connections/ConnectionApiResponse";
import { ConnectionModel } from "../../domain/models/connections/ConnectionModel";
import { ConnectionApiRequestForm } from "../../domain/models/connections/ConnectionApiRequestForm";
import { datesParse, datesToIso } from "../../utilities/dates";
import { TwoWayMapper } from "./basic-mappers";

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
        result.createdOn = datesParse(payload.createdOn);
        result.databaseName = payload.databaseName;
        result.host = payload.host;
        result.file = payload.file;
        result.username = payload.username;
        result.password = payload.password;

        return result;
    }
}


export class ConnectionModelApiRequestFormMapper extends TwoWayMapper<ConnectionModel, ConnectionApiRequestForm>
{
    protected isInput(payload: any): payload is ConnectionModel
    {
        return payload instanceof ConnectionModel;
    }
    protected toOutput(payload: ConnectionModel): ConnectionApiRequestForm
    {
        return {
            name: payload.name,
            connectionType: payload.connectionType,
            databaseName: payload.databaseName,
            host: payload.host,
            file: payload.file,
            username: payload.username,
            password: payload.password,
        }
    }
    protected toInput(payload: ConnectionApiRequestForm): ConnectionModel
    {
        const result = new ConnectionModel();

        result.name = payload.name;
        result.connectionType = payload.connectionType;
        result.databaseName = payload.databaseName ?? null;
        result.host = payload.host ?? null;
        result.file = payload.file ?? null;
        result.username = payload.username ?? null;
        result.password = payload.password ?? null;
        
        return result;
    }
    
}
