import {injectable} from "tsyringe";

export const Controller = (path: string) => {
    return function <T extends { new(...args: any[]): {} }>(constructor: T) {
        @injectable()
        class ControllerClass extends constructor {
            controllerName = constructor.name;
            path = path;
            router = [];
        }

        Reflect.defineMetadata(constructor.name, ControllerClass, constructor)
        return ControllerClass
    }
}