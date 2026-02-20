import { TableColumnsRequestData } from "../../../../shared/domain/models/column-definitions/TableColumnsRequestData";


export type SessionData = {
    openTables: TableColumnsRequestData[];
    isSidebarOpen: boolean;
};
