import { ConnectionApiRequestForm } from "../../../domain/models/connections/ConnectionApiRequestForm";
import { ConnectionModel } from "../../../domain/models/connections/ConnectionModel";
import { TwoWayMapper } from "../TwoWayMapper";



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
        };
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
