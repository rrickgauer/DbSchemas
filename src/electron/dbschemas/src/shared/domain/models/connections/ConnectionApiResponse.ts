import { ConnectionType } from "../../enums/ConnectionType";
import { Nullable } from "../../types/CustomTypes";

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
