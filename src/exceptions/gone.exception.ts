import { HTTPException } from './http.exception'

export class GoneException extends HTTPException {
  constructor (error: string = 'Gone', errorDescription?: string) {
    super(410, error, errorDescription)
  }
}
