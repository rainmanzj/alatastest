﻿'use strict';

const path = require('path');
const express = require('express');
const port = process.env.PORT || 2999;
const app = express();
const connection = null;

app.use(express.static(path.join(__dirname, 'public')));

module.exports = {
    app,
    connection
};

require('./config/express.js')(app);
require('./config/routes.js')(app);

listen();

function listen() {
    app.listen(port);
    console.log('' + port);
}
