import { BService } from './b.service';
export declare class BController {
    private readonly bService;
    constructor(bService: BService);
    withService(queryString: any): Promise<any>;
    helloFromAnotherController(): {
        message: string;
    };
    withPutMethod(): {
        message: string;
    };
    withPatchMethod(): {
        message: string;
    };
    withDeleteMethod(): {
        message: string;
    };
    withOptionsMethod(): void;
    withHeadMethod(): void;
    withTraceMethod(): void;
}
