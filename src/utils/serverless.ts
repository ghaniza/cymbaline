import fs from 'fs'
import path from 'path'

type AddFunctionOptions = {
    handler: string
    events: { [event: string]: any }
    memorySize?: number
    timeout?: number
}

export class Serverless {
    service: string
    functions: { [name: string]: any } = {}

    constructor() {
        const filePath = path.resolve(process.cwd(), 'package.json')
        const info = require(filePath)

        this.service = info.name
    }

    public addFunction(functionName: string, options: AddFunctionOptions) {
        this.functions = {
            ...this.functions,
            [functionName]: {
                ...options,
            },
        }
    }

    public async publish(stage?: string) {
        const filePath = path.resolve(__dirname, '.serverless.json')

        fs.writeFileSync(filePath, JSON.stringify(this.toObject()))
        return filePath
    }

    toObject() {
        return {
            service: this.service,
            functions: this.functions,
        }
    }
}
