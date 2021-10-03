import { Controller } from '../../../src/decorators/controller.decorator'
import { Get } from '../../../src/decorators/method.decorator'
import { Query } from '../../../src/decorators/argument.decorator'
import { BService } from './b.service'

@Controller('/other')
export class BController {
    constructor(private readonly bService: BService) {}

    @Get('/processed')
    public async withService(@Query() queryString: any) {
        return this.bService.processedData(queryString)
    }

    @Get('/')
    public helloFromAnotherController() {
        return { message: 'Hello from another controller!' }
    }
}
