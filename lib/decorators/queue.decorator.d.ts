export declare type QueueOptions = {
    deleteMessageOnSuccess?: boolean;
    queueARN?: string;
    memorySizeInMB?: number;
    timeoutInSeconds?: number;
};
export declare const Queue: (id: string, options?: QueueOptions) => <T extends {
    new (...args: any[]): {};
    uid?: string;
}>(constructor: T) => {
    new (...args: any[]): {
        constructorName: string;
        middlewares: any[];
        deleteOnSuccess: boolean;
        timeout: number;
        memorySize: number;
        queueARN: string;
    };
    uid: string;
    queueId: string;
} & T;
