import { SQSRecord } from 'aws-lambda'
import { Request, Response } from 'express'

type DeepPartial<T> = {
    [P in keyof T]?: DeepPartial<T[P]>
}

export type MiddlewareContext = {
    request?: Request
    response?: Response
    record?: DeepPartial<SQSRecord>
}

export abstract class CustomMiddleware {
    public abstract configure(context: MiddlewareContext): Promise<void> | void
}
