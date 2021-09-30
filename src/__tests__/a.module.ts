import Server, {Injectable} from "../index";
import {Get, Post} from "../decorators/method.decorator";
import {Controller} from "../decorators/controller.decorator";
import {BadRequestException} from "../exceptions/bad-request.exception";
import {Body, Param, Res} from "../decorators/argument.decorator";
import {Response} from 'express'

@Injectable()
class Service {
    public getHello() {
        return 'hello world!'
    }
}

class Database {
    public static configure() {
        return async () => new Promise((res, rej) => {
            setTimeout(() => {
                console.log('finished')
                res(null)
            }, 1000)
        })
    }
}

@Controller('/')
class MyController {
    constructor(private readonly service: Service) { }

    @Get('/service')
    public hello() {
        return this.service.getHello()
    }

    @Get('/b')
    public test() {
        throw new BadRequestException()
    }

    @Get('/c')
    public root(@Body() body: any, second: any, @Param(':a') third: any) {
        console.log({ body, second, third })
        return 'hello from root'
    }

    @Post('/b')
    public world() {
        return 'b'
    }

    @Get('/:id')
    public getId(@Param('id') id: string) {
        return id
    }
}

@Controller('/other')
class MyOtherController {
    constructor(private readonly service: Service) { }

    @Get('/:id/pdf')
    public getId(@Param('id') id: string) {
        return id + "to get pdf"
    }

    @Get('/response')
    public getResponse(@Res() res: Response) {
        res.setHeader("Custom", "test")
    }
}

const server = new Server({
    dependencies: [Database.configure()],
    controllers: [MyController, MyOtherController],
    queues: [],
    middlewares: []
})

server.init()