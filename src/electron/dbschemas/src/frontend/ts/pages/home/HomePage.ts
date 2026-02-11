import { IControllerAsync } from "../../contracts/IController";
import { ConnectionsList } from "./connections/ConnectionsList";

export class HomePageElements
{
    
}

const ELE = new HomePageElements();

export class HomePage implements IControllerAsync
{
    private _connections: ConnectionsList;
    
    constructor()
    {

        this._connections = new ConnectionsList();
    }

    public async control(): Promise<void>
    {
        await this._connections.control();
    }


}


