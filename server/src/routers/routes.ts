import  express  from "express"
const router = express.Router();
const db = require('../dbconnect');

router.get('/', (req,res)=> res.send("hello from backend"))

module.exports = router