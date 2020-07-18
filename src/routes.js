import { Router } from 'express';

import multer from 'multer';
import AdmController from './controllers/AdmController';
import SessionController from './controllers/SessionController';
import RecipientController from './controllers/RecipientController';
import DeliveryController from './controllers/DeliveryController';
import DeliverymanController from './controllers/DeliverymanController';
import RecallController from './controllers/RecallController';
import FinishController from './controllers/FinishController';
import AvatarController from './controllers/AvatarController';
import ReportController from './controllers/ReportController';
import ProblemController from './controllers/ProblemController';

import authMiddleware from './middlewares/auth';

import configMulter from './config/multer';
import './database'; // Todos os models conectam com o sequelize aqui

const routes = new Router();
const upload = multer(configMulter);

routes.post('/adm', AdmController.store);
routes.put('/adm', authMiddleware, AdmController.update);

routes.post('/session', SessionController.store);

routes.get('/deliveryman/:id', RecallController.index);
routes.put('/deliveryman/:id/recall', RecallController.update);

routes.get('/deliveryman/:id/deliveries', FinishController.index);
routes.put(
	'/deliveryman/:id/finish',
	upload.single('file'),
	FinishController.update
);

routes.get('/delivery/problems', ReportController.index);
routes.post('/delivery/:id/problems', ReportController.store);

routes.get('/delivery/:id/problems', ProblemController.index);
routes.delete('/delivery/:id/cancel', ProblemController.delete);

routes.use(authMiddleware); // Use auth for all under

routes.post('/recipient', RecipientController.store);
routes.put('/recipient/:id', RecipientController.update);
routes.delete('/recipient/:id', RecipientController.delete);

routes.get('/deliveryman', DeliverymanController.index); // List all
// routes.get('/deliveryman/:id', DeliverymanController.index); // List one
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);
routes.post(
	'/deliveryman/:id/avatar',
	upload.single('file'),
	AvatarController.store
);

routes.post('/delivery', DeliveryController.store);
routes.get('/delivery', DeliveryController.index);
routes.put('/delivery/:id', DeliveryController.update);
routes.delete('/delivery/:id', DeliveryController.delete);

export default routes;
