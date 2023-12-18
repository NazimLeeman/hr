import dotenv from 'dotenv';
dotenv.config();

const config = {
    PORT: process.env.PORT ?? 4000,
    DB_URI: process.env.DB_URI ?? 'postgres://postgres:12345@localhost:5432/dbname'
}

export default config;