const express = require('express')
const app = express();
const db = require('../dbconnect');
app.use(require('./routers/routes'))

app.listen(8080, ()=> console.log("Server running"))