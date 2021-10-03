import { HTTPException } from './http.exception';
export declare class UnauthorizedException extends HTTPException {
    constructor(error?: string, errorDescription?: string);
}
