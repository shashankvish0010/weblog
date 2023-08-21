import  express  from "express"
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import dbpool from '../../dbconnect';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { log } from "console";

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
        if(userInfo.rowCount === 0) {
            res.json({ success : false, message : "Email does not exists."});
        }
        else {
        const storedPassword = userInfo.rows[0].user_password;
        const ismatch = await bcrypt.compare( user_password, storedPassword);
        if(ismatch){
            const token = jwt.sign('jwt', userInfo.rows[0].id);
            res.cookie("user_access_token", token).status(201).json({ success : true, userData : userInfo.rows[0], message : "Login Successfully"});
        }else {
            res.json({ success : false, message : "Password is incorrect."});
        }
        }
    }
});

router.post('/admin/register', async (req,res) => {
    const id = uuidv4();
    const keys: String[] = ['A1B2C3D4E5F6', 'X8Y9Z0A1B2C', 'K7L6M5N4O3P', 'R9S8T7U6V5W', 'G3H2I1J0K9L8']
    const { firstname, lastname, email, admin_password, confirm_password, activation_key } = req.body;

    if ( !firstname || !lastname || !email || !admin_password || !confirm_password || !activation_key ) {
        res.json({ success : false, message : "Fill all the fields"});
    } else{
        const emailexist = await dbpool.query('SELECT email from admin WHERE email=$1', [email])
        if(emailexist.rows.length > 0) {
            res.json({success : false, message : 'Email already registered'});
        } else{ 
        const salt = Number(bcrypt.genSalt(10)) 
        const hashedPassword = await bcrypt.hash(admin_password, salt) 
        const confirmHashedPassword = await bcrypt.hash(confirm_password, salt)
        const ismatch = await bcrypt.compare(admin_password, confirmHashedPassword)
        if(!ismatch) {
            res.json({success : false, message : 'Password does not match'});
        }else {
            const checkKeys = keys.includes(activation_key);
            if(checkKeys){ 
            const user = await dbpool.query("INSERT INTO admin(id, firstname, lastname, email, admin_password, activation_key) VALUES($1, $2, $3, $4, $5, $6)", [id, firstname, lastname, email, hashedPassword, activation_key])
            if(user) {
                res.json({success : true, message : 'Registered Successfully'})
            }else { res.json({success : false, message : 'Admin cannot be registered'}) }
            }
            else{
                res.json({success : false, message : 'Activation key is incorrect'})
            }
        }
    }
}
});

router.post('/admin/login', async (req,res) => {
    const { email, admin_password } = req.body;
    if( !email || !admin_password ) {
        res.json({ success : false, message : "Fill all the fields."});
    } else {
        const adminInfo = await dbpool.query('SELECT * FROM admin WHERE email = $1', [email])
        if(adminInfo.rowCount === 0) {
            res.json({ success : false, message : "Email does not exists."});
        }
        else {
        const storedPassword = adminInfo.rows[0].admin_password;
        const ismatch = await bcrypt.compare(admin_password, storedPassword);
        if(ismatch){
            const token = jwt.sign('jwt', adminInfo.rows[0].id);
            res.json({ success : true,token, message : "Login Successfully"});
        }else {
            res.json({ success : false, message : "Password is incorrect."});
        }
        }
    }
});

router.get('/user/logout', async (req,res) => {
       const result = await res.clearCookie("user_access_token");
       if(result){
        res.json({success : true, message : "Logout"})
       }
})

module.exports = router