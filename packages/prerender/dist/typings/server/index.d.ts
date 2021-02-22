/// <reference types="node" />
import http from 'http';
import express from 'express';
declare class Server {
    option: Options;
    listenServer: http.Server;
    app: express.Application;
    constructor(option: Options);
    private init;
    createServer(): void;
    initRouters(): Promise<void>;
    destroy(): void;
}
export default Server;
