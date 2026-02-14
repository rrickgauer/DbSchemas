import fs from 'fs';
import path from 'path';
import { HttpStatusCode } from '../../frontend/ts/api/HttpStatusCode';
import { HttpMethods } from '../../shared/domain/constants/HttpMethods';


// export type RouteHandler = (url: URL) => Promise<Response>;

export type ControllerArgs = {
    url: URL;
    request: Request;
}

export type RouteHandler = (args: ControllerArgs) => Promise<Response>;

const NOT_FOUND_RESPONSE = new Response('Not Found', { status: 404 });

export class AppRouter
{
    private readonly _routes = new Map<string, RouteHandler>();

    //#region - Set handlers -
    public get(path: string, handler: RouteHandler): void
    {
        this.setRouteHandler(path, handler, HttpMethods.GET);
    }

    public post(path: string, handler: RouteHandler): void
    {
        this.setRouteHandler(path, handler, HttpMethods.POST);
    }

    public put(path: string, handler: RouteHandler): void
    {
        this.setRouteHandler(path, handler, HttpMethods.PUT);
    }

    public delete(path: string, handler: RouteHandler): void
    {
        this.setRouteHandler(path, handler, HttpMethods.DELETE);
    }

    public patch(path: string, handler: RouteHandler): void
    {
        this.setRouteHandler(path, handler, HttpMethods.PATCH);
    }

    private setRouteHandler(path: string, handler: RouteHandler, httpMethod: HttpMethods): void
    {
        this._routes.set(`${httpMethod} ${path}`, handler);
    }
    //#endregion


    public async handle(request: Request): Promise<Response>
    {
        // try dynamic routing
        const urlString = typeof request.url === 'string' ? request.url : '';
        const parsedUrl = new URL(urlString, 'app://localhost');

        const key = `${request.method} ${parsedUrl.pathname}`;
        const handler = this._routes.get(key);

        if (handler)
        {
            return handler({
                url: parsedUrl,
                request: request,
            });
        }

        // try serving static files
        const staticFileResponse = this.tryReturnStaticFile(parsedUrl);
        return staticFileResponse ?? NOT_FOUND_RESPONSE;
    }

    private tryReturnStaticFile(parsedUrl: URL): Response | null
    {
        const staticFilePath = path.join(process.cwd(), 'dist', parsedUrl.pathname);

        if (!fs.existsSync(staticFilePath) || !fs.statSync(staticFilePath).isFile())
        {
            return null;
        }

        const file = fs.readFileSync(staticFilePath);

        return new Response(file, {
            status: HttpStatusCode.OK,
            headers: {
                'Content-Type': getContentType(staticFilePath)
            }
        });
    }

}

function getContentType(filePath: string): string
{
    if (filePath.endsWith('.js')) return 'text/javascript';
    if (filePath.endsWith('.css')) return 'text/css';
    if (filePath.endsWith('.html')) return 'text/html';
    if (filePath.endsWith('.json')) return 'application/json';
    if (filePath.endsWith('.png')) return 'image/png';
    if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) return 'image/jpeg';
    return 'text/plain';
}
