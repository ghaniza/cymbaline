import { Request, Response } from 'express';
import { Logger } from '../server';
export declare class HTTPException extends Error {
    code: number;
    error?: string;
    error_description?: string;
    link?: string;
    constructor(code: number, error?: string, error_description?: string, link?: string);
    toResponse(): {
        error: string;
        error_description: string;
        link: string;
    };
    static handler(e: Error, req: Request, res: Response, logger: Logger): Response<any, Record<string, any>>;
}
