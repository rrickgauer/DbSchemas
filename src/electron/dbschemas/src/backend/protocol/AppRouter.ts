import fs from 'fs';
import path from 'path';
import { HttpStatusCode } from '../../shared/domain/enums/HttpStatusCode';
import { HttpMethods } from '../../shared/domain/constants/HttpMethods';
import { ControllerEndpointArgs } from './ControllerEndpointArgs';
import { match, MatchFunction } from 'path-to-regexp';
import { HTTP_RESPONSE_NOT_FOUND } from '../../shared/domain/constants/HttpResponses';
import { app } from 'electron';

export type RouteHandler = (args: ControllerEndpointArgs) => Promise<Response>;

type RouteDefinition = {
    method: HttpMethods;
    matcher: MatchFunction<object>;
    handler: RouteHandler;
};

export class AppRouter
{
    private readonly _routes: RouteDefinition[] = [];

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
        const matcher = match(path, { decode: decodeURIComponent });

        this._routes.push({
            method: httpMethod,
            matcher,
            handler
        });
    }
    //#endregion


    public async handle(request: Request): Promise<Response>
    {
        const urlString = typeof request.url === 'string' ? request.url : '';
        const parsedUrl = new URL(urlString, 'app://localhost');

        for (const route of this._routes)
        {
            if (route.method !== request.method)
                continue;

            const result = route.matcher(parsedUrl.pathname);
            if (!result)
                continue;

            const parms = result.params as Record<string, string>;

            return route.handler({
                url: parsedUrl,
                request,
                params: parms,
            });
        }

        // fallback: static files
        const staticFileResponse = this.tryReturnStaticFile(parsedUrl);
        return staticFileResponse ?? HTTP_RESPONSE_NOT_FOUND;
    }

    private tryReturnStaticFile(parsedUrl: URL): Response | null
    {
        // Strip leading slash
        const relativePath = parsedUrl.pathname.replace(/^\/+/, '');
        const staticFilePath = path.join(app.getAppPath(),'dist',relativePath);

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
