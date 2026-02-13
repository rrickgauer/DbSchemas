import { ConnectionModel } from "../../../shared/domain/models/ConnectionModel";
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
}