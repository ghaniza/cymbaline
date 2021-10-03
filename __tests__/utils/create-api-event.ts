import template from './apiEvent.json'
import { randomUUID } from 'crypto'

export type EventApiParams = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'
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
