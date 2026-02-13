import { ConnectionType } from "../enums/ConnectionType";

export interface ConnectionDbRecord {
    id: number | null;
    name: string | null;
    database_type_id: ConnectionType | null;
    database_name: string | null;
    created_on: string | null;
    host: string | null;
    file: string | null;
    username: string | null;
    password: string | null;
}


