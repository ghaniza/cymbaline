import {
    Controller,
    Get,
    Post,
    BadRequestException,
    Body,
    Param,
    Query,
    Middleware,
    Header,
    HttpCode,
} from '../../../src'

import { AService } from './a.service'
import { AMiddleware } from '../middlewares/a.middleware'
import { BMiddleware } from '../middlewares/b.middleware'
import { IsNumber, IsString } from 'class-validator'

class BodyDto {
    @IsNumber()
    a: number

    b: string
    c: number
}

class ResponseDto {
    @IsString()
    message: string
}

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
    public async postEndpoint(): Promise<ResponseDto> {
        return { message: 'You just posted' }
    }

    @Post('/a-error')
    public async postEndpointWithError(): Promise<ResponseDto> {
        const response = new ResponseDto()
        // eslint-disable-next-line no-new-func
        response.message = new Function('return 4')()
        return response
    }

    @HttpCode(200)
    @Post('/:a/parsed')
    public parsedEndpoint(@Body() body: BodyDto, empty: any, @Param('a') param: string, @Query() query: any) {
        return `This is the body: ${JSON.stringify(body)}, with "a" param: ${param} and query: ${JSON.stringify(query)}`
    }

    @Header('custom-header', 'custom value')
    @Get('/by-id/:id')
    public getId(@Param('id') id: string) {
        return this.aService.displayMessage(id)
    }
}
