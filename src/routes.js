import { Router } from 'express';

import multer from 'multer';
import AdmController from './controllers/AdmController';
import SessionController from './controllers/SessionController';
import RecipientController from './controllers/RecipientController';
import DeliverymanController from './controllers/DeliverymanController';
import FileController from './controllers/FileController';
import DeliveryController from './controllers/DeliveryController';

import authMiddleware from './middlewares/auth';

import configMulter from './config/multer';
import './database'; // Todos os models conectam com o sequelize aqui

const routes = new Router();
const upload = multer(configMulter);

routes.post('/adm', AdmController.store);
routes.put('/adm', authMiddleware, AdmController.update);

routes.post('/session', SessionController.store);

routes.use(authMiddleware); // Use auth for all under

routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);

routes.get('/deliveryman', DeliverymanController.index); // List all
routes.get('/deliveryman/:id', DeliverymanController.index); // List one
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);
routes.post(
	'/deliveryman/:id/file',
	upload.single('file'),
	FileController.store
);

routes.post('/deliveries', DeliveryController.store);
routes.get('/deliveries', DeliveryController.index);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

export default routes;
