import { Serverless } from '../src/utils/serverless'
import fs from 'fs'

describe.only('Serverless', () => {
    it('Should create a config file', async () => {
        const serverless = new Serverless()
        const path = await serverless.publish()

        expect(fs.readFileSync(path)).toBeTruthy()
    })
})
