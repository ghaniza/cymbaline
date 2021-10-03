declare global {
    // eslint-disable-next-line no-unused-vars
    namespace Express {
        export interface Request {
            timestamp: number
            user: any
            guards: {
                [key: string]: any
            }
        }
    }
}

// @ts-ignore
export default {}
