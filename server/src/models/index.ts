import { Sequelize } from 'sequelize';
import config from '../config';

const sequelize = new Sequelize(config.DB_URI);

export default sequelize;