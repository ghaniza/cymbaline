import { HTTPException } from './http.exception';
export declare class BadRequestException extends HTTPException {
    constructor(error?: string, errorDescription?: string);
}
