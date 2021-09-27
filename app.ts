require('dotenv').config();
import 'reflect-metadata';

import Server from './server/server';

console.log('---------------------environment', process.env.PORT);

const server = new Server();
server.runServer();
