import { HTTPException } from './http.exception';
export declare class GoneException extends HTTPException {
    constructor(error?: string, errorDescription?: string);
}
