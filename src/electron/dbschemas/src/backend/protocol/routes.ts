// src/main/protocol/routes.ts
import { API_ENDPOINT_CONNECTIONS } from '../../shared/domain/enums/ApiEndpoints';
import { getConnections as apiGetConnections, postConnection as apiPostConnection } from '../controllers/api/api-connections-controllers';
import { getHomePage } from '../controllers/gui/gui-controllers';
import { AppRouter } from './router';


export const router = new AppRouter();

// Page routes
router.get('/home', getHomePage);
router.get('/', getHomePage);

// api routes
router.get(`${API_ENDPOINT_CONNECTIONS}`, apiGetConnections);
router.post(`${API_ENDPOINT_CONNECTIONS}`, apiPostConnection);
