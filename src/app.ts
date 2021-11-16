require('dotenv').config();
import 'reflect-metadata';

import Server from './core/server';

const server = new Server();
server.runServer();

/* 
  import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const result = dayjs().format('YYYY-M-D');
result;

const time = dayjs().format('HH:mm:ss');
time;
*/
