import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import createConnection from '../database';
import { router } from './routes';
import { handlerErrors } from '../errors/handlerErrors';

createConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(handlerErrors);

export { app };