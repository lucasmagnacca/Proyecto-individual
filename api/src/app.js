const express = require('express');
const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser'); Deprecated
const morgan = require('morgan');
const errorHandler = require("../src/utils/middlewares/error")
const setHeaders = require("../src/utils/middlewares/setheaders")
// Aquí nos conectamos al router
const routes = require('./routes/index.js');

require('./db.js');

const server = express();

server.name = 'API';

//--------------------------------------------------------------
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' })); // Venía deprecated
server.use(cookieParser());
server.use(morgan('dev')); // Respuestas express
server.use(setHeaders)
// -------------------------------------------------------------

// Conectamos a las rutas. De la misma manera que hicimos en routes
server.use('/', routes);




// -------------------------------------------------------------
// Error catching endware.
server.use(errorHandler)
// -------------------------------------------------------------

module.exports = server;
