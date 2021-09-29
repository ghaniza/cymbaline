import { Middleware } from "./index";
export declare class JwtInjector implements Middleware {
    configure(request: Request, response: Response): Promise<any>;
}
