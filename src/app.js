const express = require('express');
const router = require('./routes/index');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./doc/openapi.json');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(morgan('dev'));
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

app.use(router);

app.use((err, req, res, next) => { 
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
  });

  app.use((req, res, next) => {
    res.status(404).json({
      url: req.originalUrl,
      msg: "Sorry, that page does not exist",
    })
  })



module.exports = app