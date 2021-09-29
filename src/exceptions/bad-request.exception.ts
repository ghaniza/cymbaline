import { HTTPException } from './http.exception'

export class BadRequestException extends HTTPException {
  constructor (error: string = 'Bad Request', errorDescription?: string) {
    super(400, error, errorDescription)
  }
}
