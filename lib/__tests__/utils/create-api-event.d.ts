export declare type EventApiParams = {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD' | 'TRACE';
    path: string;
    stage?: string;
    queryString?: {
        [key: string]: any;
    };
    body?: string;
    headers?: {
        [key: string]: any;
    };
    pathParams?: {
        [key: string]: any;
    };
};
export declare const apiEvent: (apiParams: EventApiParams) => {
    resource: string;
    path: string;
    httpMethod: string;
    headers: {};
    queryStringParameters: any;
    pathParameters: any;
    stageVariables: any;
    requestContext: {
        path: string;
        resourcePath: string;
        accountId: string;
        resourceId: string;
        stage: string;
        requestId: string;
        httpMethod: string;
        apiId: string;
    };
    body: string;
    isBase64Encoded: boolean;
};
export declare type EventSQSParams = {
    body?: string;
    messageAttributes?: any;
    messageId?: string;
    eventSourceARN?: string;
};
export declare const DEFAULT_SQS_PARAMS: {
    messageId: string;
    receiptHandle: string;
    body: string;
    attributes: {
        ApproximateReceiveCount: string;
        SentTimestamp: string;
        SenderId: string;
        ApproximateFirstReceiveTimestamp: string;
    };
    messageAttributes: {};
    md5OfBody: string;
    eventSource: string;
    eventSourceARN: string;
    awsRegion: string;
};
export declare const sqsEvent: (events: EventSQSParams[]) => {
    Records: {
        messageId: string;
        receiptHandle: string;
        body: string;
        attributes: {
            ApproximateReceiveCount: string;
            SentTimestamp: string;
            SenderId: string;
            ApproximateFirstReceiveTimestamp: string;
        };
        messageAttributes: {};
        md5OfBody: string;
        eventSource: string;
        eventSourceARN: string;
        awsRegion: string;
    }[];
};
