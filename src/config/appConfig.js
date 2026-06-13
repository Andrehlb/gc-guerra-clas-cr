require('dotenv').config();

const appConfig = {
  port: process.env.PORT,
  host: process.env.HOST,
  appName: process.env.APP_NAME,
  appContext: process.env.APP_CONTEXT,
};

module.exports = appConfig;
