import { HTTPException } from './http.exception';
export declare class InternalServerException extends HTTPException {
    constructor(error?: string, errorDescription?: string);
}
