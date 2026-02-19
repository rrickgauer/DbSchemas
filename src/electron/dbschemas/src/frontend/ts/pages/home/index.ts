
import { pageReady } from "../../utilities/PageUtility";
import { HomePage } from "./HomePage";

pageReady(async () =>
{
    const controller = new HomePage();
    await controller.control();
});


