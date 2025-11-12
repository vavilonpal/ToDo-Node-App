const express = require('express');
const bodyParser = require('express').json;
const {sequelize} = require('./models');
const categoriesRouter = require('./routes/categoryRouter');
const todosRouter = require('./routes/todoRouter');
const authRouter = require('./routes/authRouter');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const errorHandler = require("./handlers/errors/errorHandler");
const morgan = require("morgan");
const {info} = require("./logging/logger");
const logger = require("./logging/logger");

const app = express();
app.use(bodyParser());

// Documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Logging http requests in console and file
const morganFormat = ':method :url :status :res[content-length] - :response-time ms';
app.use(morgan(morganFormat, {
    stream: {
        write: (message) => info(message.trim())
    }
}));

app.use('/api/categories', categoriesRouter);

app.use('/api/todos', todosRouter);

app.use('/api/auth', authRouter);

app.use((req, res, next) => {
    res.status(404).json({
        status: 'error',
        message: 'Route not found'
    });
});


app.use(errorHandler);


module.exports = app;