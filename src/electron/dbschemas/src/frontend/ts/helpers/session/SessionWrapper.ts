import { TableColumnsRequestData } from "../../../../shared/domain/models/column-definitions/TableColumnsRequestData";

export type SessionData = {
    openTables: TableColumnsRequestData[];
}

const SESSION_KEY = 'dbschemas.data';

export class SessionWrapper
{

    public get openTables(): TableColumnsRequestData[]
    {
        return this.getSessionData().openTables;
    }

    public set openTables(value: TableColumnsRequestData[])
    {
        const currentData = this.getSessionData();
        currentData.openTables = value;
        this.saveSessionData(currentData);
    }

    public getSessionData(): SessionData
    {
        const payload = sessionStorage.getItem(SESSION_KEY);

        if (payload == null)
        {
            let emptySessionData = this.getEmptySessionData();
            this.saveSessionData(emptySessionData);
            return emptySessionData;
        }
        else
        {
            return JSON.parse(payload);
        }
    }

    public saveSessionData(sessionData: SessionData)
    {
        const payload = JSON.stringify(sessionData);
        sessionStorage.setItem(SESSION_KEY, payload);
    }

    private getEmptySessionData(): SessionData
    {
        return {
            openTables: [],
        };
    }
}

