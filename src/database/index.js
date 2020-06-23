import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Adm from '../models/Adm';
import Recipient from '../models/Recipient';
import Deliverers from '../models/Deliverer';
// import File from '../models/File';
const connection = new Sequelize(databaseConfig);

Adm.init(connection);
Recipient.init(connection);
Recipient.associate(connection.models);
Deliverers.init(connection);

export default connection;
