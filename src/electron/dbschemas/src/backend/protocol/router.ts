import fs from 'fs';
import path from 'path';


export type RouteHandler = (url: URL) => Promise<Response>;

export class AppRouter
{
    private routes = new Map<string, RouteHandler>();

    public get(path: string, handler: RouteHandler)
    {
        this.routes.set(`GET ${path}`, handler);
    }

    public async handle(request: Request): Promise<Response>
    {
        // try dynamic routing
        const parsedUrl = new URL(request.url);
        const key = `${request.method} ${parsedUrl.pathname}`;
        const handler = this.routes.get(key);

        if (handler)
        {
            return handler(parsedUrl);
        }

        // try serving static files
        const filePath = path.join(
            process.cwd(),
            'dist',
            parsedUrl.pathname
        );

        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile())
        {
            const file = fs.readFileSync(filePath);

            return new Response(file, {
                status: 200,
                headers: {
                    'Content-Type': getContentType(filePath)
                }
            });
        }

        // not found
        console.warn('router.handle no route registered for:', key);
        return new Response('Not Found', { status: 404 });

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
