import { randomUUID } from 'crypto'

export type EventApiParams = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'TRACE'
    path: string
    stage?: string
    queryString?: { [key: string]: any }
    body?: string
    headers?: { [key: string]: any }
    pathParams?: { [key: string]: any }
}

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
}

export const apiEvent = (apiParams: EventApiParams) => {
    const params = DEFAULT_API_PARAMS
    params.requestContext.requestId = randomUUID()
    params.requestContext.stage = apiParams.stage ?? 'dev'
    params.requestContext.httpMethod = apiParams.method
    params.httpMethod = apiParams.method
    params.requestContext.resourcePath = apiParams.path
    params.path = apiParams.path
    params.headers = apiParams.headers
    params.body = apiParams.body
    params.pathParameters = apiParams.pathParams
    params.queryStringParameters = apiParams.queryString

    return params
}

export type EventSQSParams = {
    body?: string
    messageAttributes?: any
    messageId?: string
    eventSourceARN?: string
}

export const DEFAULT_SQS_PARAMS = {
    messageId: randomUUID(),
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
}

export const sqsEvent = (events: EventSQSParams[]) => {
    return {
        Records: events.map((event) => {
            const params = DEFAULT_SQS_PARAMS
            params.body = event.body
            params.messageAttributes = event.messageAttributes
            params.eventSourceARN = event.eventSourceARN
            params.messageId = event.messageId ?? randomUUID()

            return params
        }),
    }
}
