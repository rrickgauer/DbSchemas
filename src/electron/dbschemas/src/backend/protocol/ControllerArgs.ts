// export type RouteHandler = (url: URL) => Promise<Response>;


export type ControllerArgs = {
    url: URL;
    request: Request;
    params: Record<string, string>;
};
