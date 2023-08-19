import { log } from "console";
import  express  from "express"
const router = express.Router();
const db = require('../dbconnect');
const { v4: uuidv4 } = require('uuid');
const dbpool = require('../dbconnect')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config()
 
router.use(bodyParser.json())
 
router.get('/', (req,res)=> res.send("hello from backend"))

router.post('/user/register', async (req,res) => {
    const id = uuidv4();
    const {firstname, lastname, email, user_password, confirm_password} = req.body;

    if(!firstname || !lastname || !email || !user_password || !confirm_password) {
        res.json({success : false, message : 'Fill all the fields'});
    }
    else{
    const emailexist = await dbpool.query('SELECT email from users WHERE email=$1', [email])
    if(emailexist.rows.length > 0) {
        res.json({success : false, message : 'Email already registered'});
    } else{ 
    const salt = Number(bcrypt.genSalt(10)) 
    const hashedPassword = await bcrypt.hash(user_password, salt) 
    const confirmHashedPassword = await bcrypt.hash(confirm_password, salt)
    const ismatch = await bcrypt.compare(user_password, confirmHashedPassword)
    if(!ismatch) {
        res.json({success : false, message : 'Password does not match'});
    } else {       
        const user = await dbpool.query("INSERT INTO users(id, firstname, lastname, email, user_password) VALUES($1, $2, $3, $4, $5)", [id, firstname, lastname, email, hashedPassword])
        if(user) {
            res.json({success : true, message : 'Registered Successfully'})
        }else { res.json({success : false, message : 'User cannot be registered'}) }
}
    }
}
})

module.exports = router