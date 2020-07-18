import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Adm from '../models/Adm';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Delivery from '../models/Delivery';
import Report from '../models/Report';

const connection = new Sequelize(databaseConfig);

const models = [Adm, Recipient, Deliveryman, File, Delivery, Report];

models
	.map((model) => model.init(connection))
	.map((model) => model.associate && model.associate(connection.models));

export default connection;
