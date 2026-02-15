import ejs from 'ejs';
import { HomePageViewModel } from '../../domain/view-models/home-page-view-model';
import { HOME_PAGE_VIEW_FILE } from '../../../shared/domain/constants/gui-view-files';
import { diConnectionService as ConnectionService} from '../../utilities/dependencies';
import { ControllerArgs } from '../../protocol/ControllerArgs';

export async function getHomePage(args: ControllerArgs): Promise<Response>
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
