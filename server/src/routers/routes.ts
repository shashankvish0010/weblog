import  express  from "express"
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import dbpool from '../../dbconnect';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';  
import { log } from "console";
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
            const token = jwt.sign(userInfo.rows[0].id, 'SECRETTOPOFUSERS');
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
            const token = jwt.sign(adminInfo.rows[0].id, 'SECRETTOPOFADMINS');
            const auth = jwt.verify(token, 'SECRETTOPOFADMINS');
            if(token && auth){
                res.cookie("admin_access", token).status(201).json({success : true, adminData : adminInfo.rows[0], message : "Cookie set"})
            }else {
                res.json({success : false, message : "Cookie not set"})
            }
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
});

router.put('/add/subscriber/:id', async (req,res)=> {
    const {id} = req.params;
        const subscriberInfo = await dbpool.query('SELECT * FROM users WHERE id=$1', [id]);
        if(subscriberInfo){
           const response = await dbpool.query('UPDATE users SET subscription=$2 WHERE id=$1', [id, true])
           if(response){
            res.json({success : true, userData : subscriberInfo.rows[0] ,message : "Thank you for subscribing"})
           }else{  
            res.json({success : false, message : "User not found, Please login"}) }
        }else {
            res.json({success : false, message : "User not found, Please login"})
        }
})

router.put('/unsubscribe/:id', async (req,res)=> {
    const {id} = req.params;
        const subscriberInfo = await dbpool.query('SELECT * FROM users WHERE id=$1', [id]);
        if(subscriberInfo){
           const response = await dbpool.query('UPDATE users SET subscription=$2 WHERE id=$1', [id, false])
           if(response){
            res.json({success : true, userdata : subscriberInfo.rows[0] ,message : "Unsubscribed"})}
            else{ 
           res.json({success : false, message : "User not found, Please login"})
            }
        }else {
            res.json({success : false, message : "User not found, Please login"})
        }
})

router.put('/edit/profile', async (req,res) => {
const {id, firstname , lastname , email } = req.body;
try {
    const user = await dbpool.query('SELECT * FROM users WHERE id=$1', [id]);
    if(user){
       const response = await dbpool.query('UPDATE users SET firstname=$1, lastname=$2, email=$3 WHERE id=$4', [firstname, lastname, email, id])
       response ? res.json({success:true, message:"Profile Updated"}) : res.json({success:false, message:"User profile not updated"})
    }else{
        res.json({success:false, message:"User not found"})
    }
} catch (error) {
    console.log(error);
}
})

router.post('/publish/blogpost', async (req,res) => {
    const blogId = uuidv4();
    const { id, title, image, description,meta, tags, key } = req.body;
    try {
        const user_writer_info = await dbpool.query('SELECT * FROM users WHERE id=$1', [id]);
        if(user_writer_info.rows.length > 0){
            const { firstname, lastname, email } = user_writer_info.rows[0];
            const result = await dbpool.query('INSERT INTO blogposts(id , writer_firstname , writer_lastname , writer_email , blog_title , blog_image , blog_description , blog_keywords , public_view, meta_description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', 
            [ blogId, firstname, lastname, email, title, image, description, tags, key, meta]);
            if(key === true){
            if(result){
                res.json({ success:true, message:"Post published Successfully" })
            }else{
                res.json({ success:false, message:"Post not published" })
            }}
            else{
                if(result){
                    res.json({ success:true, message:"Post saved in Private" })
                }else{
                    res.json({ success:false, message:"Post not saved" })
                }
            }
        }else{
            const admin_writer_info = await dbpool.query('SELECT * FROM admin WHERE id=$1', [id]);
            if(admin_writer_info.rows.length > 0){
                const { firstname, lastname, email } = admin_writer_info.rows[0];
                const result = await dbpool.query('INSERT INTO blogposts(id , writer_firstname , writer_lastname , writer_email , blog_title , blog_image , blog_description , blog_keywords , public_view, meta_description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', 
                [ blogId, firstname, lastname, email, title, image, description, tags, key, meta]);
                if(key === true){
                if(result){
                    res.json({ success:true, message:"Post published Successfully" })
                }else{
                    res.json({ success:false, message:"Post not published" })
                }}
                else{
                    if(result){
                        res.json({ success:true, message:"Post saved in Private" })
                    }else{
                        res.json({ success:false, message:"Post not saved" })
                    }
                }
            }else{
                res.json({ success:false, message:"Cannot find user" })
            }
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/api/posts', async (req,res)=>{
    try {
        const blogsinfo = await dbpool.query('SELECT * FROM blogposts WHERE public_view=$1', [true]);
        if(blogsinfo){
            res.json({success:true, blogs : blogsinfo.rows, message:"Posts fetched"})
        }else{
            res.json({success:false, message:"Posts not fetched"})
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/view/post/:id', async (req,res) => {
    const {id} = req.params
    if(id){
        const postData = await dbpool.query('SELECT * FROM blogposts WHERE id=$1', [id]);
        if(postData){
            const post = postData.rows[0];
            if(post){
                res.json({success:true,post, message:"Post sent successfully"})
            }else{
                res.json({success:false, message:"Posts not found from db"})
            }
        }else{
            res.json({success:false, message:"Posts not fetched"})
        }
    }else{
        res.json({success:false, message:"Post Id not recieved"})
    }
})

module.exports = router