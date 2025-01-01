import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV}` });

const configuration = {
  node_env: process.env.NODE_ENV,
  host: process.env.HOST,
  port: process.env.PORT,
  domain: process.env.DOMAIN,
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
  },
  jwt: {
    secret: {
      access: process.env.JWT_ACCESS_TOKEN_SECRET,
      refresh: process.env.JWT_REFRESH_TOKEN_SECRET,
      forgot_password: process.env.JWT_FORGOT_PASSWORD_TOKEN_SECRET,
    },
  },
  ai: {
    key: process.env.GEMINIAI_API_KEY,
  },
  smtp: {
    service: process.env.SMTP_SERVICE,
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
  },
};

export default configuration;
