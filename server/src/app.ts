import express from 'express';
const app = express();
import db from '../dbconnect';
import dbpool from '../dbconnect';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
app.use(bodyParser.json({ limit: '10mb' }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(cors(
    {origin: "https://weblog-lake.vercel.app"}
))
app.use(require('./routers/routes'))

app.listen(process.env.PORT, () => console.log("Server running"))