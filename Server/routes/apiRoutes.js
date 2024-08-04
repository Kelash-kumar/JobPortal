const express = require('express');
const app = express();

app.use('/api/v1/auth/',require('./userRoutes'));
app.use('/api/v1/company/',require('./companyRoutes'));
module.exports = app;