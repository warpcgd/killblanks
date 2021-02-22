/// <reference types="node" />
import * as sockjs from 'sockjs';
import * as http from 'http';
declare const SOCK_NODE_EVENTS_OBJ: {
    update: "update";
    connect: "connect";
    console: "console";
    generate: "generate";
    getUrl: "getUrl";
    saveShellFile: "saveShellFile";
    writeShellFile: "writeShellFile";
};
declare type SOCK_NODE_EVENTS_TYPE = keyof typeof SOCK_NODE_EVENTS_OBJ;
interface Msg {
    type: SOCK_NODE_EVENTS_TYPE;
    data: any;
}
declare type SOCKETS_TYPE = keyof Sockets;
declare class NodeSock {
    sockjsServer: sockjs.Server;
    option: Options;
    sockets: Sockets;
    routesData: {
        fileName: string;
        originUrl: string;
        skeletonPageUrl: string;
        qrCode: string;
        html: string;
    };
    constructor(option: Options);
    createServer(listenServer: http.Server): void;
    resiveSocketData(conn: sockjs.Connection): (message: string) => void;
    update(): Promise<void>;
    generate(msg: Msg): Promise<void>;
    connect(msg: Msg, conn: sockjs.Connection): void;
    console(msg: Msg): void;
    getUrl(): void;
    saveShellFile(msg: Msg): Promise<void>;
    writeShellFile(): Promise<void>;
    sockWrite(name: SOCKETS_TYPE, type: string, data: string): void;
}
export default NodeSock;
