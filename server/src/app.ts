import express from 'express';
const app = express();
import db from '../dbconnect';
import dbpool from '../dbconnect';
import cors from 'cors';
import bodyParser from 'body-parser';
app.use(bodyParser.json({limit : '10mb'}))
app.use(bodyParser.urlencoded({ limit : '10mb', extended : true }))
app.use(cors())
app.use(require('./routers/routes'))

app.listen(8080, ()=> console.log("Server running"))