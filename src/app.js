const express = require('express');
const app = express();
const router = express.Router();//Rotas
const index = require('../routes/index');
const apiRoute = require('../routes/apiRoute');
app.use('/', index);
app.use('/api', apiRoute);
app.use('/*', index);
module.exports = app;