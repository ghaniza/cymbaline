import { Controller } from '../../../src/decorators/controller.decorator'
import { Get, Post } from '../../../src/decorators/method.decorator'
import { BadRequestException } from '../../../src/exceptions/bad-request.exception'
import { Body, Param, Query } from '../../../src/decorators/argument.decorator'
import { AService } from './a.service'
import { AMiddleware } from '../middlewares/a.middleware'
import { Middleware } from '../../../src/decorators/middleware.decorator'
import { Header } from '../../../src/decorators/header.decorator'
import { BMiddleware } from '../middlewares/b.middleware'

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

    @Middleware(AMiddleware)
    @Get('/b')
    public withRequestHandlerMiddleware() {
        return { message: 'Success' }
    }

    @Get('/c')
    @Middleware(BMiddleware)
    public withCustomMiddleware() {
        return { message: 'Success' }
    }

    @Post('/a')
    public postEndpoint() {
        return { message: 'You just posted' }
    }

    @Post('/:a/parsed')
    public parsedEndpoint(@Body() body: any, empty: any, @Param('a') param: string, @Query() query: any) {
        return `This is the body: ${JSON.stringify(body)}, with "a" param: ${param} and query: ${JSON.stringify(query)}`
    }

    @Header('custom-header', 'custom value')
    @Get('/by-id/:id')
    public getId(@Param('id') id: string, @Query('token') token: string) {
        return `The param is ${id} and the query value of token is: ${token}`
    }
}
