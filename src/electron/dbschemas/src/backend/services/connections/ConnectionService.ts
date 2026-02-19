
import { ConnectionApiRequestForm } from "../../../shared/domain/models/connections/ConnectionApiRequestForm";
import { ConnectionModel } from "../../../shared/domain/models/connections/ConnectionModel";
import { ServiceResponse } from "../../../shared/domain/ServiceResponses/ServiceResponse";
import { ServiceResponseBase } from "../../../shared/domain/ServiceResponses/ServiceResponseBase";
import { ConnectionTableMapper } from "../../../shared/mappers/table-mappers/ConnectionTableMapper";
import { isNull } from "../../../shared/utilities/NullableUtility";
import { IConnectionRepository } from "../../repositories/connections/IConnectionRepository";
import { IConnectionService } from "./IConnectionService";

export type ConnectionServiceArgs = {
    repo: IConnectionRepository;
    mapper: ConnectionTableMapper;
}

export class ConnectionService implements IConnectionService
{
    private readonly _repo: IConnectionRepository;
    private readonly _mapper: ConnectionTableMapper;

    constructor(args: ConnectionServiceArgs)
    {
        this._repo = args.repo;
        this._mapper = args.mapper;
    }

    public getConnections(): ConnectionModel[]
    {
        const table = this._repo.getAllConnections();
        return this._mapper.toModels(table);
    }

    public saveConnection(data: ConnectionApiRequestForm): ServiceResponse<ConnectionModel>;
    public saveConnection(data: ConnectionApiRequestForm, connectionId: number): ServiceResponse<ConnectionModel>;
    public saveConnection(data: ConnectionApiRequestForm, connectionId?: number): ServiceResponse<ConnectionModel>
    {
        if (isNull(connectionId))
        {
            return this.createNewConnection(data);
        }
        else
        {
            return this.updateConnection(connectionId, data);
        }
    }

    private createNewConnection(data: ConnectionApiRequestForm): ServiceResponse<ConnectionModel>
    {
        const newConnectionId = this._repo.insertConnection(data);
        return this.getConnection(newConnectionId);
    }

    private updateConnection(connectionId: number, data: ConnectionApiRequestForm): ServiceResponse<ConnectionModel>
    {
        this._repo.updateConnection(connectionId, data);
        return this.getConnection(connectionId);
    }

    public getConnection(connectionId: number): ServiceResponse<ConnectionModel>
    {
        const row = this._repo.getConnection(connectionId);
        const result = new ServiceResponse<ConnectionModel>();

        if (row != null)
        {
            result.data = this._mapper.toModel(row);
        }

        return result;
    }

    public deleteConnection(connectionId: number): ServiceResponseBase
    {
        this._repo.deleteConnection(connectionId);
        return new ServiceResponseBase();
    }
    
}