import { Controller } from '../../../src/decorators/controller.decorator'
import { Get, Post } from '../../../src/decorators/method.decorator'
import { BadRequestException } from '../../../src/exceptions/bad-request.exception'
import { Body, Param, Query } from '../../../src/decorators/argument.decorator'
import { AService } from './a.service'
import { AMiddleware } from '../middlewares/a.middleware'
import { Middleware } from '../../../src/decorators/middleware.decorator'
import { Header } from '../../../src/decorators/header.decorator'
import { BMiddleware } from '../middlewares/b.middleware'
import { HttpCode } from '../../../src/decorators/http-code.decorator'

@Controller('/')
export class AController {
    constructor(private readonly aService: AService) {}

    @Get('/service')
    public withService() {
        return this.aService.getHello()
    }

    @Get('/a')
    public withException() {
        throw new BadRequestException()
    }

    @Get('/b')
    @Middleware(AMiddleware)
    public withRequestHandlerMiddleware() {
        return { message: 'Success' }
    }

    @Middleware(BMiddleware)
    @Get('/c')
    @HttpCode(200)
    public withCustomMiddleware() {
        return { message: 'Success' }
    }

    @Post('/a')
    @Header('some-custom-header', 'some custom value')
    public postEndpoint() {
        return { message: 'You just posted' }
    }

    @HttpCode(200)
    @Post('/:a/parsed')
    public parsedEndpoint(@Body() body: any, empty: any, @Param('a') param: string, @Query() query: any) {
        console.log({ body })
        return `This is the body: ${JSON.stringify(body)}, with "a" param: ${param} and query: ${JSON.stringify(query)}`
    }

    @Header('custom-header', 'custom value')
    @Get('/by-id/:id')
    public getId(@Param('id') id: string) {
        return this.aService.displayMessage(id)
    }
}
