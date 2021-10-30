require('dotenv').config();
import 'reflect-metadata';

import Server from './core/server';

const server = new Server();
server.runServer();
