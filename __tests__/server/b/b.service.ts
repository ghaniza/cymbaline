export class BService {
    public async processedData(data: any): Promise<any> {
        return Object.keys(data).reduce((p, c) => {
            return { ...p, [c]: data[c] * 10 }
        }, {} as any)
    }

    public async sqsMessage(msgId: string, message: string) {
        return `[${msgId}] The message is: ${message}`
    }
}
