const express = require('express')
const app = express();
const db = require('../dbconnect');
const dbpool = require('../dbconnect')
const cors = require('cors')
const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(cors())
app.use(require('./routers/routes'))

app.listen(8080, ()=> console.log("Server running"))