import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: process.env.PORT ?? 4000,
    CORS_ORIGIN: process.env.CORS_ORIGIN ?? "*",
    DB_URI: process.env.DB_URI ?? 'postgres://postgres:12345@localhost:5432/hrdb'
}

export default config;