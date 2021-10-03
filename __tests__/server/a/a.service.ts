import { Injectable } from '../../../src'

@Injectable()
export class AService {
    public async getHello(): Promise<string> {
        return 'Hello World!'
    }

    public async displayMessage(id: string) {
        return Promise.resolve('The ID is ' + id)
    }
}
