import  express  from "express"
const router = express.Router();
const db = require('../dbconnect');
const { v4: uuidv4 } = require('uuid');
const dbpool = require('../../dbconnect')
const bcrypt = require('bcrypt')

router.get('/', (req,res)=> res.send("hello from backend"))

router.post('/user-register', async (req,res) => {
    const id = uuidv4();
    const {firstname, lastname, email, user_password, confirm_password} = req.body;

    if(!firstname || !lastname || !email || !user_password || !confirm_password) {
        res.json({success : false, message : 'Fill all the fields'});
    }
    const emailexist = await dbpool.query('SELECT email from users WHERE email=$1', [email])
    if(emailexist) {
        res.json({success : false, message : 'Email already registered'});
    }
    const salt = bcrypt.gensalt(10)
    const hashedPassword = await bcrypt.hash(user_password, salt)
    const confirmHashedPassword = await bcrypt.hash(confirm_password, salt)
    const ismatch = bcrypt.compare(hashedPassword, confirmHashedPassword);
    if(!ismatch) {
        res.json({success : false, message : 'Password does not match'});
    }

    try {
        const user = await dbpool.query('INSERT INTO users(id, firstname, lastname, email, user_password, confirm_password) VALUES ($1, $2, $3, $4, $5, $6)', [id, firstname, lastname, email, user_password, confirm_password])
        if(user) {
            res.json({success : true, message : 'Registered Successfully'})
        }else { res.json({success : false, message : 'User cannot be registered'}) }
    } catch (error) {
        res.json({success : false, message : error});
    }
})

router.get('/apit', (req,res) => res.send("apti"))

module.exports = router