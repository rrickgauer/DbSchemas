import { ConnectionModel } from "../../../shared/domain/models/ConnectionModel";

export type HomePageViewModel = {
    title: string;
    connections: ConnectionModel[];
}