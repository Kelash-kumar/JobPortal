const express = require('express');
const app = express();

app.use('/api/v1/auth/',require('./userRoutes'));

module.exports = app;