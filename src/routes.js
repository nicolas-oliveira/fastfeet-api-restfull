import { Router } from 'express';

import multer from 'multer';
import AdmController from './controllers/AdmController';
import SessionController from './controllers/SessionController';
import RecipientController from './controllers/RecipientController';
import DelivererController from './controllers/DelivererController';
import FileController from './controllers/FileController';

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

routes.get('/deliverer', DelivererController.index); // List all
routes.get('/deliverer/:id', DelivererController.index); // List one
routes.post('/deliverer', DelivererController.store);
routes.put('/deliverer/:id', DelivererController.update);
routes.delete('/deliverer/:id', DelivererController.delete);
routes.post('/deliverer/:id/file', upload.single('file'), FileController.store);

export default routes;
