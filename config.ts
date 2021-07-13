import { configDatabase } from './config/database';

export default configDatabase[process.env.DB_DIALECT];
