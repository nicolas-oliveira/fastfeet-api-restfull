import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Adm from '../models/Adm';
import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

const connection = new Sequelize(databaseConfig);

Adm.init(connection);

Recipient.init(connection);
Recipient.associate(connection.models);

Deliveryman.init(connection);

File.init(connection);
Deliveryman.associate(connection.models);

export default connection;
