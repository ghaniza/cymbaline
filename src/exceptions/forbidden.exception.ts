import { HTTPException } from './http.exception'

export class ForbiddenException extends HTTPException {
    constructor(error: string = 'Forbidden', errorDescription?: string) {
        super(403, error, errorDescription)
    }
}
