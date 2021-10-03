import { Request, Response } from 'express'
import { Logger } from '../server'

export class HTTPException extends Error {
    constructor(public code: number, public error?: string, public error_description?: string, public link?: string) {
        super(error)
    }

    public toResponse() {
        return {
            error: this.error,
            error_description: this.error_description,
            link: this.link,
        }
    }

    public static handler(e: Error, req: Request, res: Response, logger: Logger) {
        if (process.env.DEBUG && e instanceof HTTPException) {
            switch (true) {
                case e.code >= 400 && e.code < 500:
                    logger.log('warn', e)
                    break
                case e.code >= 500:
                    logger.log('error', e)
                    break
                default:
                    logger.log('info', e)
                    break
            }
        } else if (process.env.DEBUG) {
            console.log(e)
        }

        if (e instanceof HTTPException) {
            if (e.error) return res.status(e.code).send(e.toResponse())
            return res.sendStatus(e.code)
        }

        if (process.env.DEBUG) return res.status(500).send(e.message)
        return res.sendStatus(500)
    }
}
