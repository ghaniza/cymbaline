import { HTTPException } from './http.exception';
export declare class NotFoundException extends HTTPException {
    constructor(error?: string, errorDescription?: string);
}
