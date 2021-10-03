import { BService } from './b.service';
export declare class BQueue {
    private readonly bService;
    constructor(bService: BService);
    handler(messageId: string, message: any, messageAttributes: any): Promise<void>;
}
