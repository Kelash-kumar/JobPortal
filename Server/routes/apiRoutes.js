const express = require('express');
const app = express();

app.use('/api/v1/auth/',require('./userRoutes'));
app.use('/api/v1/company/',require('./companyRoutes'));
app.use('/api/v1/job/',require('./jobRoutes'));
app.use('/api/v1/job/application/',require('./applicationRoutes'));
module.exports = app;