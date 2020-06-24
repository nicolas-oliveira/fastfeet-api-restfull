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

routes.post('/recipient', authMiddleware, RecipientController.store);
routes.put('/recipient/:id', authMiddleware, RecipientController.update);

routes.post('/deliverer', authMiddleware, DelivererController.store);
routes.get('/deliverer', authMiddleware, DelivererController.index);
routes.put('/deliverer/:id', authMiddleware, DelivererController.delete);
// routes.post('/deliverer/file/:id', authMiddleware, DelivererController.store);

export default routes;
