"use strict";
exports.__esModule = true;
exports.DEFAULT_PACKAGE_OPTIONS = exports.DEFAULT_PROVIDER_OPTIONS = void 0;
exports.DEFAULT_PROVIDER_OPTIONS = {
    name: 'aws',
    region: process.env.AWS_REGION,
    runtime: 'nodejs14.x',
    lambdaHashingVersion: '20201221'
};
exports.DEFAULT_PACKAGE_OPTIONS = {
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
    ]
};
