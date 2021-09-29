export interface Middleware {
    configure: (request: Request, response: Response) => Promise<any> | any
}