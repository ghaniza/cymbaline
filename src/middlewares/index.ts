import { SQSRecord } from 'aws-lambda'
import { Request, Response } from 'express'

export type MiddlewareContext = {
    request?: Request
    response?: Response
    record?: SQSRecord
}

export abstract class CustomMiddleware {
    public abstract configure(context: MiddlewareContext): Promise<void> | void
}
