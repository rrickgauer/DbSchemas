
import { ipcRegisterGuiEventHandlers } from "../../helpers/ipc/IpcHandler";
import { pageOnReady } from "../../utilities/PageUtility";
import { HomePage } from "./HomePage";

pageOnReady(async () =>
{
    ipcRegisterGuiEventHandlers();
    
    const controller = new HomePage();
    await controller.control();
});


