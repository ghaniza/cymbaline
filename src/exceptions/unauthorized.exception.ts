import { HTTPException } from './http.exception'

export class UnauthorizedException extends HTTPException {
    constructor(error: string = 'Unauthorized', errorDescription?: string) {
        super(401, error, errorDescription)
    }
}
