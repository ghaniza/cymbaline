import fs from 'fs'
import path from 'path'
import { DEFAULT_PACKAGE_OPTIONS, DEFAULT_PROVIDER_OPTIONS } from './serverless.constants'

type AddFunctionOptions = {
    handler: string
    events: { [event: string]: any }
    memorySize?: number
    timeout?: number
}

export type ProviderOptions = {
    name?: 'aws'
    runtime?: string
    stage?: string
    region?: string
    lambdaHashingVersion?: string
    environment?: { [key: string]: string }
    iam?: {
        role?: {
            statements?: {
                Effect: string
                Action: string[]
                Resource: []
            }[]
        }
    }
    vpc?: {
        securityGroupIds?: string[]
        subnetIds: string[]
    }
}

export type PackageOptions = {
    individually: boolean
    patterns: string[]
}

export class Serverless {
    service: string
    functions: { [name: string]: any } = {}
    package: PackageOptions = DEFAULT_PACKAGE_OPTIONS
    provider: ProviderOptions = DEFAULT_PROVIDER_OPTIONS

    constructor() {
        const filePath = path.resolve('package.json')
        const info = JSON.parse(fs.readFileSync(filePath).toString())

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

    public saveMetadata(metadataDir: string) {
        const filePath = path.resolve(metadataDir, '.serverless.json')
        fs.writeFileSync(filePath, JSON.stringify(this.toObject()))
    }

    toObject() {
        return {
            service: this.service,
            useDotenv: true,
            functions: this.functions,
            package: this.package,
        }
    }
}
