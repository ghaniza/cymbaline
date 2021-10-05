export declare const Controller: (path: string) => <T extends {
    new (...args: any[]): {};
    uid?: string;
}>(constructor: T) => {
    new (...args: any[]): {
        controllerName: string;
        path: string;
        middlewares: any[];
    };
    uid: string;
} & T;
