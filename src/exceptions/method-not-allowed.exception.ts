import {HTTPException} from './http.exception'

export class MethodNotAllowedException extends HTTPException {
  constructor(error: string = 'Method Not Allowed', errorDescription?: string) {
    super(405, error, errorDescription)
  }
}
