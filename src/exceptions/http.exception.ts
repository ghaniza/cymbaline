import {NextFunction, Request, Response} from 'express'
import {Logger} from "../server";

export class HTTPException extends Error {
    constructor(
        public code: number,
        public error?: string,
        public error_description?: string,
        public link?: string
    ) {
        super(error)
    }

    public toResponse() {
        return {
            error: this.error,
            error_description: this.error_description,
            link: this.link
        }
    }

    public static handler(e: Error, req: Request, res: Response, logger: Logger) {
        if (process.env.DEBUG) {
            logger.log('error', e)
        }

        if (e instanceof HTTPException) {
            if (e.error)
                return res.status(e.code).send(e.toResponse())
            return res.sendStatus(e.code)
        }

        if (process.env.DEBUG)
            return res.status(500).send(e.message)
        return res.sendStatus(500)
    }
}