// Main starting point of the application

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const router = require('./router');

const app = express();

// App setup

// Register middleware
app.use(morgan('tiny'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// Server setup

const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
