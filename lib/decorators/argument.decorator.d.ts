export declare const ArgumentDecorator: (payload: any) => (target: any, propertyKey: string, index: number) => void;
export declare const Body: (key?: string, options?: {
    parse?: boolean;
}) => (target: any, propertyKey: string, index: number) => void;
export declare const Param: (key?: string) => (target: any, propertyKey: string, index: number) => void;
export declare const Query: (key?: string) => (target: any, propertyKey: string, index: number) => void;
export declare const Req: (options?: {
    parsed: boolean;
}) => (target: any, propertyKey: string, index: number) => void;
export declare const Res: (options?: {
    skipSend?: boolean;
}) => (target: any, propertyKey: string, index: number) => void;
export declare const ReceiptHandle: () => (target: any, propertyKey: string, index: number) => void;
export declare const MsgId: () => (target: any, propertyKey: string, index: number) => void;
export declare const EventSource: () => (target: any, propertyKey: string, index: number) => void;
export declare const MD5OfBody: () => (target: any, propertyKey: string, index: number) => void;
export declare const MsgAtt: () => (target: any, propertyKey: string, index: number) => void;
export declare const Att: () => (target: any, propertyKey: string, index: number) => void;
