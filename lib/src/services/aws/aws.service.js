"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AwsService = void 0;
const client_sqs_1 = require("@aws-sdk/client-sqs");
class AwsService {
    async getQueueUrl(record) {
        const queueName = record.eventSourceARN.split(':').pop();
        const client = new client_sqs_1.SQSClient({ region: process.env.AWS_REGION });
        const command = new client_sqs_1.GetQueueUrlCommand({ QueueName: queueName });
        const response = await client.send(command);
        return response.QueueUrl;
    }
    async deleteMessage(queueUrl, receiptHandle) {
        const client = new client_sqs_1.SQSClient({ region: process.env.AWS_REGION });
        const command = new client_sqs_1.DeleteMessageCommand({
            QueueUrl: queueUrl,
            ReceiptHandle: receiptHandle,
        });
        await client.send(command);
    }
}
exports.AwsService = AwsService;
//# sourceMappingURL=aws.service.js.map