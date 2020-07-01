import express from 'express';
import { resolve } from 'path';
import routes from './routes';
import './database';

const app = express();

// Middlewares
app.use(express.json());

app.use(
	'/deliverer/file',
	express.static(resolve(__dirname, '..', 'tmp', 'uploads'))
);
//

app.use(routes);

export default app;
