export declare const Controller: (path: string) => <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        path: string;
    };
} & T;
