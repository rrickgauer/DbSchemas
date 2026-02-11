// src/main/protocol/routes.ts
import { getConnections } from '../controllers/api/api-connections-controllers';
import { getHomePage } from '../controllers/gui/gui-controllers';
import { AppRouter } from './router';


export const router = new AppRouter();

// Page routes
router.get('/home', async () => getHomePage());
router.get('/', async () => getHomePage());

router.get('/api/connections', async () => getConnections());

// Later you can add:
// router.get('/api/lists', getListsApi);
// router.get('/settings', getSettingsPage);
