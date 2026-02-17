import { ConnectionType } from "../../enums/ConnectionType";
import { Nullable } from "../../types/types";

export type ConnectionApiResponse = {
    id: number;
    name: string;
    connectionType: ConnectionType;
    createdOn: string;
    databaseName: Nullable<string>;
    host: Nullable<string>;
    file: Nullable<string>;
    username: Nullable<string>;
    password: Nullable<string>;
};
