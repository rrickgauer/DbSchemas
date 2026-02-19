import ejs from 'ejs';
import { HomePageViewModel } from '../../domain/view-models/HomePageViewModel';
import { HOME_PAGE_VIEW_FILE } from '../../../shared/domain/constants/GuiViewFiles';
import { diConnectionService as ConnectionService} from '../../utilities/DependencyInjectionUtility';
import { ControllerEndpointArgs } from '../../protocol/ControllerEndpointArgs';

export async function getHomePage(args: ControllerEndpointArgs): Promise<Response>
{
    const connectionService = ConnectionService;

    const viewModel: HomePageViewModel = {
        connections: connectionService.getConnections(),
        title: 'Home page',
    };

    const html = await ejs.renderFile(HOME_PAGE_VIEW_FILE, viewModel);

    return new Response(html, {
        headers: { 'Content-Type': 'text/html' }
    });
}
