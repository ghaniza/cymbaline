import { Controller } from '../../../src/decorators/controller.decorator'
import { Delete, Get, Head, Options, Patch, Put, Trace } from '../../../src/decorators/method.decorator'
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

    @Put('/')
    public withPutMethod() {
        return { message: 'Hello from PUT method' }
    }

    @Patch('/')
    public withPatchMethod() {
        return { message: 'Hello from PATCH method' }
    }

    @Delete('/')
    public withDeleteMethod() {
        return { message: 'Hello from DELETE method' }
    }

    @Options('/')
    public withOptionsMethod() {}

    @Head('/')
    public withHeadMethod() {}

    @Trace('/')
    public withTraceMethod() {}
}
