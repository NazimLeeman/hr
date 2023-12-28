import { Sequelize } from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(config.DB_URI, {
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // You may need to set this to false in some environments
      },
    },
  });

export default sequelize;