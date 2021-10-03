"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqsEvent = exports.DEFAULT_SQS_PARAMS = exports.apiEvent = void 0;
const crypto_1 = require("crypto");
const DEFAULT_API_PARAMS = {
    resource: '/',
    path: '/',
    httpMethod: 'GET',
    headers: {},
    queryStringParameters: null,
    pathParameters: null,
    stageVariables: null,
    requestContext: {
        path: '/dev/',
        resourcePath: '/',
        accountId: '125002137610',
        resourceId: 'qdolsr1yhk',
        stage: 'dev',
        requestId: '',
        httpMethod: 'POST',
        apiId: 'j3azlsj0c4',
    },
    body: '',
    isBase64Encoded: false,
};
const apiEvent = (apiParams) => {
    const params = DEFAULT_API_PARAMS;
    params.requestContext.requestId = (0, crypto_1.randomUUID)();
    params.requestContext.stage = apiParams.stage ?? 'dev';
    params.requestContext.httpMethod = apiParams.method;
    params.httpMethod = apiParams.method;
    params.requestContext.resourcePath = apiParams.path;
    params.path = apiParams.path;
    params.headers = apiParams.headers;
    params.body = apiParams.body;
    params.pathParameters = apiParams.pathParams;
    params.queryStringParameters = apiParams.queryString;
    return params;
};
exports.apiEvent = apiEvent;
exports.DEFAULT_SQS_PARAMS = {
    messageId: (0, crypto_1.randomUUID)(),
    receiptHandle: 'AQEBwJnKyrHigUMZj6rYigCgxlaS3SLy0a',
    body: '',
    attributes: {
        ApproximateReceiveCount: '1',
        SentTimestamp: '1545082649183',
        SenderId: 'AIDAIENQZJOLO23YVJ4VO',
        ApproximateFirstReceiveTimestamp: '1545082649185',
    },
    messageAttributes: {},
    md5OfBody: '098f6bcd4621d373cade4e832627b4f6',
    eventSource: 'aws:sqs',
    eventSourceARN: 'arn:aws:sqs:us-east-2:123456789012:my-test-queue',
    awsRegion: 'us-east-1',
};
const sqsEvent = (events) => {
    return {
        Records: events.map((event) => {
            const params = exports.DEFAULT_SQS_PARAMS;
            params.body = event.body;
            params.messageAttributes = event.messageAttributes;
            params.eventSourceARN = event.eventSourceARN;
            params.messageId = event.messageId ?? (0, crypto_1.randomUUID)();
            return params;
        }),
    };
};
exports.sqsEvent = sqsEvent;
//# sourceMappingURL=create-api-event.js.map