// export type RouteHandler = (url: URL) => Promise<Response>;


export type ControllerEndpointArgs = {
    url: URL;
    request: Request;
    params: Record<string, string>;
};
