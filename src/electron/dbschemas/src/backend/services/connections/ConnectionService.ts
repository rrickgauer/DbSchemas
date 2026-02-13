
import { ConnectionApiRequestForm } from "../../../shared/domain/models/connections/ConnectionApiRequestForm";
import { ConnectionModel } from "../../../shared/domain/models/connections/ConnectionModel";
import { ServiceResponse } from "../../../shared/domain/ServiceResponses/ServiceResponse";
import { ConnectionTableMapper } from "../../../shared/mappers/table-mappers/ConnectionTableMapper";
import { IConnectionRepository } from "../../repositories/connections/IConnectionRepository";

export type ConnectionServiceArgs = {
    repo: IConnectionRepository;
    mapper: ConnectionTableMapper;
}

export class ConnectionService
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

    public createConnection(connectionData: ConnectionApiRequestForm): ServiceResponse<ConnectionModel>
    {
        const newConnectionId = this._repo.insertConnection(connectionData);

        const connections = this.getConnections();

        return new ServiceResponse({    
            data: connections.find(x => x.id === newConnectionId),
        });

    }
}