import { ConnectionModel } from "../../../shared/domain/models/connections/ConnectionModel";

export type HomePageViewModel = {
    title: string;
    connections: ConnectionModel[];
}