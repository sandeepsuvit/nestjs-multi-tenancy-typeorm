import * as ormconfig from '../database/ormconfig';
import { join } from 'path';
import * as dotenv from "dotenv";

dotenv.config()

module.exports = {
    ...ormconfig,
    synchronize: process.env.NODE_ENV === 'development',
    logging: true,
    entities: [
        join(__dirname, '../../modules/tenant/**/*.entity{.ts,.js}'),
    ],
    migrations: [
        join(__dirname, '../../migrations/tenant/*{.ts,.js}'),
    ],
}