// src/main/protocol/routes.ts
import { getConnections } from '../controllers/api/api-connections-controllers';
import { getHomePage } from '../controllers/gui/gui-controllers';
import { AppRouter } from './router';


export const router = new AppRouter();

// Page routes
router.get('/home', getHomePage);
router.get('/', getHomePage);

// api routes
router.get('/api/connections', getConnections);
