import { SQSRecord } from 'aws-lambda';
import { Request, Response } from 'express';
declare type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>;
};
export declare type MiddlewareContext = {
    request?: Request;
    response?: Response;
    record?: DeepPartial<SQSRecord>;
};
export declare abstract class CustomMiddleware {
    abstract configure(context: MiddlewareContext): Promise<void> | void;
}
export {};
