
import { ConnectionModel } from "../../domain/models/connections/ConnectionModel";
import { DataRow } from "../../domain/types/CustomTypes";
import { datesParseString } from "../../utilities/DatesUtility";
import { getValueDefault } from "../../utilities/MiscUtility";
import { TableMapper } from "./TableMapper";

export class ConnectionTableMapper extends TableMapper<ConnectionModel>
{
    public toModel(row: DataRow): ConnectionModel
    {
        const result = new ConnectionModel();

        result.id = getValueDefault(row.id, result.id);
        result.name = getValueDefault(row.name, result.name);
        result.connectionType = getValueDefault(row.database_type_id, result.connectionType);
        result.databaseName = getValueDefault(row.database_name, result.databaseName);
        result.createdOn = datesParseString(row.created_on);
        result.host = row.host;
        result.file = row.file;
        result.username = row.username;
        result.password = row.password;

        return result;
    }

}
