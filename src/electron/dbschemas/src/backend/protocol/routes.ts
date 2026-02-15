// src/main/protocol/routes.ts
import { API_ENDPOINT_CONNECTIONS } from '../../shared/domain/constants/ApiEndpoints';
import { apiConnectionsGet, apiConnectionsGetAll, apiConnectionsPost, apiConnectionsPut } from '../controllers/api/api-connections-controllers';
import { getHomePage } from '../controllers/gui/gui-controllers';
import { AppRouter } from './router';

export const router = new AppRouter();

// Page routes
router.get('/home', getHomePage);
router.get('/', getHomePage);

// api routes
router.get(`${API_ENDPOINT_CONNECTIONS}`, apiConnectionsGetAll);
router.post(`${API_ENDPOINT_CONNECTIONS}`, apiConnectionsPost);
router.get(`${API_ENDPOINT_CONNECTIONS}/:connectionId`, apiConnectionsGet);
router.put(`${API_ENDPOINT_CONNECTIONS}/:connectionId`, apiConnectionsPut);
