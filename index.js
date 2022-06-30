const express = require('express');
const log4js = require('log4js');
const morgan = require('morgan');
const routes = require('./app/Routes');
const ErrorHandlerMiddleware = require('./app/utils/ErrorHandlerMiddleware');
const { PREFIX } = require('./app/config/AppConfig');


class Server {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.logger = log4js.getLogger('project-ms');
    this.start();
  }

  config() {
    this.app.set('port', process.env.PORT || 3002);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(morgan('dev'));
  }

  routes() {
    this.app.use(PREFIX, routes);
    this.app.use(ErrorHandlerMiddleware.MainHandler);
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log('SERVER ON PORT', this.app.get('port'));
    });
  }
}

const server = new Server();
module.exports = server.app;
