import { HTTPException } from './http.exception'

export class InternalServerException extends HTTPException {
    constructor(error: string = 'Internal Server Error', errorDescription?: string) {
        super(500, error, errorDescription)
    }
}
