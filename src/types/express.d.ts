declare global {
    namespace Express {
        export interface Request {
            timestamp: number,
            user: any,
            guards: {
                [key: string]: any
            }
        }
    }
}

// @ts-ignore
export default {}