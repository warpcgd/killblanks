/// <reference types="node" />
import * as sockjs from 'sockjs';
import * as http from 'http';
declare const SOCK_NODE_EVENTS_OBJ: {
    generate: "generate";
    connect: "connect";
    getUrl: "getUrl";
    console: "console";
    saveShellFile: "saveShellFile";
    writeShellFile: "writeShellFile";
    update: "update";
};
declare type SOCK_NODE_EVENTS_TYPE = keyof typeof SOCK_NODE_EVENTS_OBJ;
interface Msg {
    type: SOCK_NODE_EVENTS_TYPE;
    data: any;
}
declare type SOCKETS_TYPE = keyof Sockets;
declare class NodeSock {
    sockjsServer: sockjs.Server | null;
    option: Options | null;
    sockets: Sockets | null;
    routesData: {
        fileName: string;
        originUrl: string;
        skeletonPageUrl: string;
        qrCode: string;
        html: string;
    } | undefined;
    constructor(option: Options);
    createServer(listenServer: http.Server): void;
    resiveSocketData(conn: sockjs.Connection): (message: string) => void;
    update(): Promise<void>;
    generate(msg: Msg): Promise<void>;
    connect(msg: Msg, conn: sockjs.Connection): void;
    console(msg: Msg): void;
    getUrl(): void;
    sockWrite(name: SOCKETS_TYPE, type: string, data: string): void;
    destroy(): void;
}
export default NodeSock;
