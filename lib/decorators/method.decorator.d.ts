export declare const Get: (path: string, httpCode?: number) => (target: any, propertyName: string, descriptor: PropertyDescriptor) => void;
export declare const Post: (path: string, httpCode?: number) => (target: any, propertyName: string, descriptor: PropertyDescriptor) => void;
export declare const Put: (path: string, httpCode?: number) => (target: any, propertyName: string, descriptor: PropertyDescriptor) => void;
export declare const Patch: (path: string, httpCode?: number) => (target: any, propertyName: string, descriptor: PropertyDescriptor) => void;
export declare const Delete: (path: string, httpCode?: number) => (target: any, propertyName: string, descriptor: PropertyDescriptor) => void;
export declare const Options: (path: string, httpCode?: number) => (target: any, propertyName: string, descriptor: PropertyDescriptor) => void;
export declare const Head: (path: string, httpCode?: number) => (target: any, propertyName: string, descriptor: PropertyDescriptor) => void;
