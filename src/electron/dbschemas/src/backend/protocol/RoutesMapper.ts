// src/main/protocol/routes.ts
import { API_ENDPOINT_CONNECTION_SINGLE, API_ENDPOINT_CONNECTION_TABLES, API_ENDPOINT_CONNECTIONS } from '../../shared/domain/constants/ApiEndpoints';
import { apiConnectionsDelete, apiConnectionsGet, apiConnectionsGetAll, apiConnectionsPost, apiConnectionsPut } from '../controllers/api/ApiControllerConnections';
import { apiTablesGetAll } from '../controllers/api/ApiControllerTables';
import { getHomePage } from '../controllers/gui/GuiControllers';
import { AppRouter } from './AppRouter';

export const router = new AppRouter();

// Page routes
router.get('/home', getHomePage);
router.get('/', getHomePage);

// api routes

//#region - Connections -
router.get(API_ENDPOINT_CONNECTIONS, apiConnectionsGetAll);
router.post(API_ENDPOINT_CONNECTIONS, apiConnectionsPost);
router.get(API_ENDPOINT_CONNECTION_SINGLE, apiConnectionsGet);
router.put(API_ENDPOINT_CONNECTION_SINGLE, apiConnectionsPut);
router.delete(API_ENDPOINT_CONNECTION_SINGLE, apiConnectionsDelete);
//#endregion


//#region - Connection Tables -
router.get(API_ENDPOINT_CONNECTION_TABLES, apiTablesGetAll);
//#endregion

