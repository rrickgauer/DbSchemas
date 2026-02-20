
import { ipcRegisterGuiEventHandlers } from "../../helpers/ipc/IpcHandler";
import { pageReady } from "../../utilities/PageUtility";
import { HomePage } from "./HomePage";

pageReady(async () =>
{
    ipcRegisterGuiEventHandlers();
    
    const controller = new HomePage();
    await controller.control();
});


