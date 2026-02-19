import { ConnectionType } from "../../enums/ConnectionType";
import { Nullable } from "../../types/CustomTypes";



export type ConnectionApiRequestForm = {
    name: string;
    connectionType: ConnectionType;
    databaseName?: Nullable<string>;
    host?: Nullable<string>;
    file?: Nullable<string>;
    username?: Nullable<string>;
    password?: Nullable<string>;
};
