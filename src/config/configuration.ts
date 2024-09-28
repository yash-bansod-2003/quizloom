import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV}` });

const configuration = {
  node_env: process.env.NODE_ENV,
  host: process.env.HOST,
  port: process.env.PORT,
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  },
  jwks_uri: process.env.JWKS_URI,
};

export default configuration;
