export declare type QueueOptions = {
    deleteMessageOnSuccess?: boolean;
};
export declare const Queue: (id: string, options?: QueueOptions) => <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        constructorName: string;
        queueId: string;
        middlewares: any[];
        deleteOnSuccess: boolean;
    };
    uid: string;
} & T;
