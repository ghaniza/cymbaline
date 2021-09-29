import { HTTPException } from './http.exception';
export declare class MethodNotAllowedException extends HTTPException {
    constructor(error?: string, errorDescription?: string);
}
