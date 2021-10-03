import { AService } from './a.service';
export declare class AController {
    private readonly aService;
    constructor(aService: AService);
    withService(): Promise<string>;
    withException(): void;
    withRequestHandlerMiddleware(): {
        message: string;
    };
    withCustomMiddleware(): {
        message: string;
    };
    postEndpoint(): {
        message: string;
    };
    parsedEndpoint(body: any, empty: any, param: string, query: any): string;
    getId(id: string): Promise<string>;
}
