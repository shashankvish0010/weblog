import  express  from "express"
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import dbpool from '../../dbconnect';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

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
});

router.post('/user/login', async (req,res) => {
    const { email, user_password } = req.body;
    if( !email || !user_password ) {
        res.json({ success : false, message : "Fill all the fields."});
    } else {
        const userInfo = await dbpool.query('SELECT * FROM users WHERE email = $1', [email])
        console.log(userInfo.rows[0].email);
        
        if(!userInfo) {
            res.json({ success : false, message : "Email does not exists."});
        }
        else {
        const storedPassword = userInfo.rows[0].user_password;
        const ismatch = await bcrypt.compare( user_password, storedPassword);
        if(ismatch){
            const token = jwt.sign('jwt', userInfo.rows[0].id);
            res.json({ success : true,token, message : "Login Successfully"});
        }else {
            res.json({ success : false, message : "Password is incorrect."});
        }
        }
    }
})

module.exports = router