
import { pageReady } from "../../utilities/page";
import { HomePage } from "./HomePage";

pageReady(async () => {
    const controller = new HomePage();
    await controller.control();
});


