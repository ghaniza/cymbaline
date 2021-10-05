declare type AddFunctionOptions = {
    handler: string;
    events: {
        [event: string]: any;
    };
    memorySize?: number;
    timeout?: number;
};
export declare type ProviderOptions = {
    name?: 'aws';
    runtime?: string;
    stage?: string;
    region?: string;
    lambdaHashingVersion?: string;
    environment?: {
        [key: string]: string;
    };
    iam?: {
        role?: {
            statements?: {
                Effect: string;
                Action: string[];
                Resource: [];
            }[];
        };
    };
    vpc?: {
        securityGroupIds?: string[];
        subnetIds: string[];
    };
};
export declare type PackageOptions = {
    individually: boolean;
    patterns: string[];
};
export declare class Serverless {
    service: string;
    functions: {
        [name: string]: any;
    };
    package: PackageOptions;
    provider: ProviderOptions;
    constructor();
    addFunction(functionName: string, options: AddFunctionOptions): void;
    saveMetadata(metadataDir: string): void;
    toObject(): {
        service: string;
        useDotenv: boolean;
        functions: {
            [name: string]: any;
        };
        package: PackageOptions;
    };
}
export {};
