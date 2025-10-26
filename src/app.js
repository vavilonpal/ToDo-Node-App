const express = require('express');
const bodyParser = require('express').json;
const {sequelize} = require('./models');
const categoriesRouter = require('./routes/categories');
const todosRouter = require('./routes/todos');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');

const app = express();
app.use(bodyParser());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/categories', categoriesRouter);
app.use('/api/todos', todosRouter);

// Обработка ошибок JSON
app.use((err,
         req,
         res,
         next) => {
    console.error(err);
    res.status(err.status || 500).json({error: err.message || 'Internal Server Error'});
});

module.exports = app;