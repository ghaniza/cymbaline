export declare class BService {
    processedData(data: any): Promise<any>;
    sqsMessage(msgId: string, message: string): Promise<string>;
}
