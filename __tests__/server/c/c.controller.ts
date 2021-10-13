import { Controller } from '../../../src/decorators/controller.decorator'
import { Get, Post } from '../../../src/decorators/method.decorator'
import { Body } from '../../../src/decorators/argument.decorator'
import { Middleware } from '../../../src/decorators/middleware.decorator'
import { CMiddleware } from '../middlewares/c.middleware'

@Controller('/controller-c')
@Middleware(CMiddleware)
export class CController {
    @Get('/')
    public async getControllerMiddlewareA(@Body('value') value: string) {
        return value
    }

    @Post('/')
    public async getControllerMiddlewareB(@Body('value') value: string) {
        return value
    }
}
