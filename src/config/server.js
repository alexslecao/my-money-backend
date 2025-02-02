const port = 3005;

const bodyParser = require('body-parser');
const express = require('express');
const allowCors = require('./cors');
const expressParser = require('express-query-int');

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(allowCors);
server.use(expressParser());

server.listen(port, function () {
    console.log(`server is running on port ${port}`);
});

module.exports = server;