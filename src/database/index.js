import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Adm from '../models/Adm';
import Recipient from '../models/Recipient';
import Deliverer from '../models/Deliverer';
import File from '../models/File';

const connection = new Sequelize(databaseConfig);

Adm.init(connection);

Recipient.init(connection);
Recipient.associate(connection.models);

Deliverer.init(connection);

File.init(connection);
Deliverer.associate(connection.models);

export default connection;
