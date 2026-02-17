import { datesGetCurrentDatetime } from "../../../utilities/DatesUtility";
import { EMPTY_STRING } from "../../constants/StringConstants";
import { ConnectionType } from "../../enums/ConnectionType";
import { DateTimeValid, Nullable } from "../../types/CustomTypes";

export class ConnectionModel
{
    public id: number = -1;
    public name: string = EMPTY_STRING;
    public connectionType: ConnectionType = ConnectionType.MySQL;
    public createdOn: DateTimeValid = datesGetCurrentDatetime();
    public databaseName: Nullable<string> = null;
    public host: Nullable<string> = null;
    public file: Nullable<string> = null;
    public username: Nullable<string> = null;
    public password: Nullable<string> = null;
}

