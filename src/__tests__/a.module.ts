import Server, {Injectable} from "../index";
import {Get, Post} from "../decorators/method.decorator";
import {Controller} from "../decorators/controller.decorator";
import {BadRequestException} from "../exceptions/bad-request.exception";
import {Body} from "../decorators/body.decorator";

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

    @Get('/a')
    public hello() {
        return this.service.getHello()
    }

    @Get('/b')
    public test() {
        throw new BadRequestException()
    }

    @Get('/')
    public root(body: any) {
        console.log({ body })
        return 'hello from root'
    }

    @Post('/b')
    public world() {
        return 'b'
    }
}

const server = new Server({
    dependencies: [Database.configure()],
    controllers: [MyController],
    queues: [],
    middlewares: []
})

server.init()