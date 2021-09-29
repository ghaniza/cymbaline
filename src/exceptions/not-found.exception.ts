import { HTTPException } from './http.exception'

export class NotFoundException extends HTTPException {
  constructor (error: string = 'Not Found', errorDescription?: string) {
    super(404, error, errorDescription)
  }
}
