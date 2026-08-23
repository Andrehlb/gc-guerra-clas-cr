require('dotenv').config();

const appConfig = {
  port: process.env.PORT || 3000,
  host: process.env.HOST || '127.0.0.1',
  appName: process.env.APP_NAME || 'GC ⚔️ Guerra de Clãs',
  appContext: process.env.APP_CONTEXT || 'API',
};

module.exports = appConfig;
