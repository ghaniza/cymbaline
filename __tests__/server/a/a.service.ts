import { Injectable } from '../../../src'

@Injectable()
export class AService {
    public async getHello(): Promise<string> {
        return 'Hello World!'
    }

    public async displayMessage(id: string) {
        const message = Promise.resolve('The ID is ' + id)
        console.log(message)
    }
}
