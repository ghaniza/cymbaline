import { PackageOptions, ProviderOptions } from './serverless'

export const DEFAULT_PROVIDER_OPTIONS: ProviderOptions = {
    name: 'aws',
    region: process.env.AWS_REGION,
    runtime: 'nodejs14.x',
    lambdaHashingVersion: '20201221',
}

export const DEFAULT_PACKAGE_OPTIONS: PackageOptions = {
    individually: true,
    patterns: [
        'src/__tests__/**',
        '.idea/**',
        'serverless-configs/**',
        'envs/**',
        'support/**',
        'node_modules/.cache/**',
        'node_modules/aws-lambda/**',
        '.env.*',
        '.env',
    ],
}
