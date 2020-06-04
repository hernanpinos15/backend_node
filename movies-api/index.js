const express = require('express');
const app = express();
const { config } = require('./config/index');
const moviesApi = require('./routes/movies.js');
const {
    logErrors,
    errorHandler,
    wrapErrors
} = require('./utils/middleware/errorHandlers.js');
const notFoundHandler = require('./utils/middleware/notFoundHandler.js');
const debug = require('debug')('app:server');

//body parse
app.use(express.json());

//routes
moviesApi(app);

//carch 404
app.use(notFoundHandler);

//Errors middleware
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, function () {
    // console.log(`Listening http://localhost:${config.port}`);
    debug(`Listening http://localhost:${config.port}`);
});
