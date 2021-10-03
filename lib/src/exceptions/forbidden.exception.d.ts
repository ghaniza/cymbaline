import { HTTPException } from './http.exception';
export declare class ForbiddenException extends HTTPException {
    constructor(error?: string, errorDescription?: string);
}
