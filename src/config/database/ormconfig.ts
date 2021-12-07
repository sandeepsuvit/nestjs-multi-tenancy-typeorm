import { join } from "path";
import * as dotenv from "dotenv";

dotenv.config()

module.exports = {
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASS || "password",
    database: process.env.DB_NAME || "tenancy_db",
    migrationRun: true,
    synchronize: process.env.NODE_ENV === 'development',
    entities: [
        join(__dirname, '../../modules/public/**/*.entity{.ts,.js}'),
    ],
    migrations: [
        join(__dirname, '../../migrations/public/*.{ts,.js}'),
    ],
}