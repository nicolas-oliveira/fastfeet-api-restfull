import { Router } from 'express';

import AdmController from './controllers/AdmController';
import SessionController from './controllers/SessionController';
import RecipientController from './controllers/RecipientController';
import DelivererController from './controllers/DelivererController';

import authMiddleware from './middlewares/auth';

import './database'; // Todos os models conectam com o sequelize aqui

const routes = new Router();

routes.post('/adm', AdmController.store);
routes.put('/adm', authMiddleware, AdmController.update);

routes.post('/session', SessionController.store);

routes.use(authMiddleware); // Use auth for all under

routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);

routes.get('/deliverer', DelivererController.index); // List all
routes.get('/deliverer/:id', DelivererController.index); // List one
routes.post('/deliverer', DelivererController.store);
routes.put('/deliverer/:id', DelivererController.update);
routes.delete('/deliverer/:id', DelivererController.delete);

export default routes;
