import Puppeteer from '../pup/index';
import Server from '../server/index';
import NodeSock from '../client/sock_node';
import Render from '../render/index';
declare let PUPPETEER: Puppeteer;
declare let SERVER: Server;
declare let NODESOCK: NodeSock;
declare let RENDER: Render;
export declare function initMediator(option: Options): Promise<void>;
export { PUPPETEER, SERVER, NODESOCK, RENDER };
