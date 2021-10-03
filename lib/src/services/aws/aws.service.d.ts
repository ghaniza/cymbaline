import { SQSRecord } from 'aws-lambda';
export declare class AwsService {
    getQueueUrl(record: SQSRecord): Promise<string>;
    deleteMessage(queueUrl: string, receiptHandle: string): Promise<void>;
}
