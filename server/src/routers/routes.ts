import express from "express"
const router = express.Router();
import { v4 as uuidv4 } from "uuid";
import dbpool from '../../dbconnect';
import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import { error, log } from "console";

router.use(bodyParser.json())
let originalOtp: Number
router.get('/', (req, res) => res.send("hello from backend"))
router.post('/user/register', async (req, res) => {
    console.log("enter");

    const id = uuidv4();
    const { firstname, lastname, email, user_password, confirm_password } = req.body;

    if (!firstname || !lastname || !email || !user_password || !confirm_password) {
        res.json({ success: false, message: 'Fill all the fields' });
    }
    else {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(emailPattern.test(email)){
        const emailexist = await dbpool.query('SELECT email from users WHERE email=$1', [email])
        if (emailexist.rows.length > 0) {
            res.json({ success: false, message: 'Email already registered' });
        } else {
            const genertedOTP = Number(`${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`)
            originalOtp = genertedOTP
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            })

            const email_message = {
                from: `"Shashank V. WeBlog" <${process.env.EMAIL}>`,
                to: email,
                subject: "Verify your account",
                text: `Your verification code is ${originalOtp} by weblog.`,
            }

            transporter.sendMail(email_message).then(async () => {
                const salt = Number(bcrypt.genSalt(10))
                const hashedPassword = await bcrypt.hash(user_password, salt)
                const confirmHashedPassword = await bcrypt.hash(confirm_password, salt)
                const ismatch = await bcrypt.compare(user_password, confirmHashedPassword)
                if (!ismatch) {
                    res.json({ success: false, message: 'Password does not match' });
                } else {
                    const user = await dbpool.query("INSERT INTO users(id, firstname, lastname, email, user_password) VALUES($1, $2, $3, $4, $5)", [id, firstname, lastname, email, hashedPassword])
                    if (user) {
                        res.json({ success: true, id, Verified : false, message: 'Registered Successfully' })
                    } else { res.json({ success: false, message: 'User cannot be registered' }) }
                }
            }).catch((error) => {
                console.log(error);
            })
        }
    }else{
        res.json({ success: false, message: 'Invalid Email' });
    }
}
});

router.put('/verify/account/:id', async (req, res) => {
    const { id } = req.params
    const { otp } = req.body;
    console.log(id, otp);

    if (otp) {
        if (otp === originalOtp) {
            const result = await dbpool.query('UPDATE users SET account_verified=$2 WHERE id=$1', [id, true])
            if (result) {
                res.json({ success: true, message: "Account Verified" })
            } else { res.json({ success: false, message: 'Incorrect OTP entered' }) }
        } else {
            res.json({ success: false, message: 'OTP is invalid' })
        }
    }
})

router.get('/verify/account/re/:id', async (req, res) => {
    const { id } = req.params
    const genertedOTP = Number(`${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`)
    originalOtp = genertedOTP
    if (id) {
        if (id) {
            const user = await dbpool.query('SELECT * FROM users WHERE id=$1', [id])
            if (user) {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                })

                const email_message = {
                    from: `"Shashank V. WeBlog" <${process.env.EMAIL}>`,
                    to: user.rows[0].email,
                    subject: "Verify your account",
                    text: `Your verification code is ${originalOtp} by weblog.`,
                }

                transporter.sendMail(email_message).then(() => {
                    res.json({ success: true, message: "Check your email to get the OTP" })
                }).catch((error) => {
                    console.log(error);
                    res.json({ success: false, message: "Error occurred" })
                })
            }
        }
    }
})

router.post('/user/login', async (req, res) => {
    const { email, user_password } = req.body;
    if (!email || !user_password) {
        res.json({ success: false, message: "Fill all the fields." });
    } else {
        const userInfo = await dbpool.query('SELECT * FROM users WHERE email = $1', [email])
        if (userInfo.rowCount === 0) {
            res.json({ success: false, message: "Email does not exists." });
        }
        else {
            if (userInfo.rows[0].account_verified === true) {
                const storedPassword = userInfo.rows[0].user_password;
                const ismatch = await bcrypt.compare(user_password, storedPassword);
                if (ismatch) {
                    const token = jwt.sign(userInfo.rows[0].id, process.env.USERS_SECRET || '');
                    res.cookie("user_access_token", token).status(201).json({ success: true,token, userData: userInfo.rows[0], message: "Login Successfully" });
                } else {
                    res.json({ success: false, message: "Password is incorrect." });
                }
            }
            else {
                res.json({ success: false, message: "Please verify your account" });
            }
        }
    }
});

router.post('/admin/register', async (req, res) => {
    const id = uuidv4();
    const keys: String[] = ['A1B2C3D4E5F6', 'X8Y9Z0A1B2C', 'K7L6M5N4O3P', 'R9S8T7U6V5W', 'G3H2I1J0K9L8']
    const { firstname, lastname, email, admin_password, confirm_password, activation_key } = req.body;

    if (!firstname || !lastname || !email || !admin_password || !confirm_password || !activation_key) {
        res.json({ success: false, message: "Fill all the fields" });
    } else {
        const emailexist = await dbpool.query('SELECT email from admin WHERE email=$1', [email])
        if (emailexist.rows.length > 0) {
            res.json({ success: false, message: 'Email already registered' });
        } else {
            const salt = Number(bcrypt.genSalt(10))
            const hashedPassword = await bcrypt.hash(admin_password, salt)
            const confirmHashedPassword = await bcrypt.hash(confirm_password, salt)
            const ismatch = await bcrypt.compare(admin_password, confirmHashedPassword)
            if (!ismatch) {
                res.json({ success: false, message: 'Password does not match' });
            } else {
                const checkKeys = keys.includes(activation_key);
                if (checkKeys) {
                    const user = await dbpool.query("INSERT INTO admin(id, firstname, lastname, email, admin_password, activation_key) VALUES($1, $2, $3, $4, $5, $6)", [id, firstname, lastname, email, hashedPassword, activation_key])
                    if (user) {
                        res.json({ success: true, message: 'Registered Successfully' })
                    } else { res.json({ success: false, message: 'Admin cannot be registered' }) }
                }
                else {
                    res.json({ success: false, message: 'Activation key is incorrect' })
                }
            }
        }
    }
});

router.post('/admin/login', async (req, res) => {
    const { email, admin_password } = req.body;
    if (!email || !admin_password) {
        res.json({ success: false, message: "Fill all the fields." });
    } else {
        const adminInfo = await dbpool.query('SELECT * FROM admin WHERE email = $1', [email])
        if (adminInfo.rowCount === 0) {
            res.json({ success: false, message: "Email does not exists." });
        }
        else {
            const storedPassword = adminInfo.rows[0].admin_password;
            const ismatch = await bcrypt.compare(admin_password, storedPassword);
            if (ismatch) {
                const token = jwt.sign(adminInfo.rows[0].id, process.env.ADMIN_SECRET || '');
                const auth = jwt.verify(token, process.env.ADMIN_SECRET || '');
                if (token && auth) {
                    res.cookie("admin_access_token", token).status(201).json({ success: true, adminData: adminInfo.rows[0], message: "Cookie set" })
                } else {
                    res.json({ success: false, message: "Cookie not set" })
                }
            } else {
                res.json({ success: false, message: "Password is incorrect." });
            }
        }
    }
});

router.put('/add/subscriber/:id', async (req, res) => {
    const { id } = req.params;
    const subscriberInfo = await dbpool.query('SELECT * FROM users WHERE id=$1', [id]);
    if (subscriberInfo) {
        const response = await dbpool.query('UPDATE users SET subscription=$2 WHERE id=$1', [id, true])
        if (response) {
            res.json({ success: true, userData: subscriberInfo.rows[0], message: "Thank you for subscribing" })
        } else {
            res.json({ success: false, message: "User not found, Please login" })
        }
    } else {
        res.json({ success: false, message: "User not found, Please login" })
    }
})

router.put('/unsubscribe/:id', async (req, res) => {
    const { id } = req.params;
    const subscriberInfo = await dbpool.query('SELECT * FROM users WHERE id=$1', [id]);
    if (subscriberInfo) {
        const response = await dbpool.query('UPDATE users SET subscription=$2 WHERE id=$1', [id, false])
        if (response) {
            res.json({ success: true, userdata: subscriberInfo.rows[0], message: "Unsubscribed" })
        }
        else {
            res.json({ success: false, message: "User not found, Please login" })
        }
    } else {
        res.json({ success: false, message: "User not found, Please login" })
    }
})

router.put('/edit/profile', async (req, res) => {
    const { id, firstname, lastname, email } = req.body;
    try {
        const user = await dbpool.query('SELECT * FROM users WHERE id=$1', [id]);
        if (user) {
            const response = await dbpool.query('UPDATE users SET firstname=$1, lastname=$2, email=$3 WHERE id=$4', [firstname, lastname, email, id])
            response ? res.json({ success: true, message: "Profile Updated" }) : res.json({ success: false, message: "User profile not updated" })
        } else {
            res.json({ success: false, message: "User not found" })
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/publish/blogpost', async (req, res) => {
    const blogId = uuidv4();
    const date = new Date()
    const { id, title, image, description, meta, tags, key } = req.body;
    try {
        const user_writer_info = await dbpool.query('SELECT * FROM users WHERE id=$1', [id]);
        if (user_writer_info.rows.length > 0) {
            const { firstname, lastname, email } = user_writer_info.rows[0];
            const result = await dbpool.query('INSERT INTO blogposts(id , writer_firstname , writer_lastname , writer_email , blog_title , blog_image , blog_description , blog_keywords , public_view, meta_description, posted) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
                [blogId, firstname, lastname, email, title, image, description, tags, key, meta, date.toDateString()]);
            if (key === true) {
                if (result) {
                    res.json({ success: true, message: "Post published Successfully" })
                } else {
                    res.json({ success: false, message: "Post not published" })
                }
            }
            else {
                if (result) {
                    res.json({ success: true, message: "Post saved in Private" })
                } else {
                    res.json({ success: false, message: "Post not saved" })
                }
            }
        } else {
            const admin_writer_info = await dbpool.query('SELECT * FROM admin WHERE id=$1', [id]);
            if (admin_writer_info.rows.length > 0) {
                const { firstname, lastname, email } = admin_writer_info.rows[0];
                const result = await dbpool.query('INSERT INTO blogposts(id , writer_firstname , writer_lastname , writer_email , blog_title , blog_image , blog_description , blog_keywords , public_view, meta_description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
                    [blogId, firstname, lastname, email, title, image, description, tags, key, meta]);
                if (key === true) {
                    if (result) {
                        res.json({ success: true, message: "Post published Successfully" })
                    } else {
                        res.json({ success: false, message: "Post not published" })
                    }
                }
                else {
                    if (result) {
                        res.json({ success: true, message: "Post saved in Private" })
                    } else {
                        res.json({ success: false, message: "Post not saved" })
                    }
                }
            } else {
                res.json({ success: false, message: "Cannot find user" })
            }
        }
    } catch (error) {
        console.log(error);
    }
})

router.put('/edit/blogpost', async (req, res) => {
    const { id, title, image, meta, tags, description, key } = req.body;
    try {
        if (id) {
            const blog = await dbpool.query('UPDATE blogposts SET blog_title=$1, blog_image=$2, meta_description=$3, blog_keywords=$4, blog_description=$5, public_view=$7 WHERE id=$6', [title, image, meta, tags, description, id, key])
            if (blog) {
                res.json({ success: true, message: "Posts Updated" })
            } else {
                res.json({ success: false, message: "Posts not updated" })
            }
        } else {
            res.json({ success: false, message: "Posts Id not found" })
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/api/posts', async (req, res) => {
    try {
        const blogsinfo = await dbpool.query('SELECT * FROM blogposts WHERE public_view=$1', [true]);
        if (blogsinfo) {
            res.json({ success: true, blogs: blogsinfo.rows, message: "Posts fetched" })
        } else {
            res.json({ success: false, message: "Posts not fetched" })
        }
    } catch (error) {
        console.log(error);
    }
})

router.get('/view/post/:id', async (req, res) => {
    const { id } = req.params
    if (id) {
        const postData = await dbpool.query('SELECT * FROM blogposts WHERE id=$1', [id]);
        if (postData) {
            const post = postData.rows[0];
            if (post) {
                res.json({ success: true, blogData: post, message: 'Completd' })
            } else {
                res.json({ success: false, message: "Posts not found from db" })
            }
        } else {
            res.json({ success: false, message: "Posts not fetched" })
        }
    } else {
        res.json({ success: false, message: "Post Id not recieved" })
    }
})

router.get('/fetch/user/posts/:email', async (req, res) => {
    const { email } = req.params;
    try {
        if (email) {
            const userPosts = await dbpool.query('SELECT * FROM blogposts WHERE writer_email=$1', [email])
            if (userPosts.rows.length > 0) {
                res.json({ success: true, userPostsData: userPosts.rows, message: "Posts fetched successfully" })
            } else {
                res.json({ success: false, message: "No posts to show" })
            }
        } else {
            res.json({ success: false, message: "Email not receieved" })
        }
    } catch (error) {
        console.log(error);
    }
})

router.delete('/delete/post/:id', async (req, res) => {
    const { id } = req.params;
    if (id) {
        const result = await dbpool.query('DELETE FROM blogposts WHERE id=$1', [id])
        if (result) {
            res.json({ success: true, message: "Post Deleted" })
        } else {
            res.json({ success: false, message: "Post not deleted" })
        }
    } else {
        res.json({ success: false, message: "Post Id not receieved" })
    }
})

router.put('/flag/post/:id', async (req, res) => {
    const { id } = req.params;
    const { body } = req.body
    if (id) {
        const WriterEmail = await dbpool.query('SELECT writer_firstname, writer_email FROM blogposts WHERE id=$1', [id])
        if (WriterEmail.rows.length > 0) {
            const result = await dbpool.query('UPDATE blogposts SET public_view=$2 WHERE id=$1', [id, false])
            if (result) {
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL,
                        pass: process.env.PASSWORD
                    }
                })
                const email_message = {
                    from: `"Shashank V. WeBlog" <${process.env.EMAIL}>`,
                    to: WriterEmail.rows[0].writer_email,
                    subject: `${WriterEmail.rows[0].writer_firstname}, Your Post Got Flagged`,
                    html: body
                }
                transporter.sendMail(email_message).then(() => {
                    res.json({ success: true, message: "Post flagged" })
                }).catch((error) => { console.log(error) })

            } else {
                res.json({ success: false, message: "Post not flagged" })
            }
        } else {
            res.json({ success: false, message: "Cannot get writers email" })
        }
    } else {
        res.json({ success: false, message: "Post Id not receieved" })
    }
})

router.get('/search/post/:query', async (req, res) => {
    const { query } = req.params
    try {
        const TotalPosts = await dbpool.query('SELECT * FROM blogposts')
        if (TotalPosts.rows.length > 0) {
            const filteredPosts = TotalPosts.rows.filter((post) => {
                return (
                    post.blog_title.toLowerCase().includes((query).toLowerCase()) ||
                    post.blog_description.toLowerCase().includes((query).toLowerCase()) ||
                    post.blog_keywords.toLowerCase().includes((query).toLowerCase())
                )
            })
            if (filteredPosts.length > 0) {
                res.json({ success: true, filteredPosts, message: 'Sent Filtered Results' })
            } else {
                res.json({ success: false, message: 'No result found' })
            }
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/send/updates', async (req, res) => {
    const { title, body } = req.body

    try {
        const emails = await dbpool.query('SELECT email FROM users WHERE subscription=$1', [true])
        console.log(emails.rows.map((curr) => console.log(curr.email))
        );

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        const email_message = {
            from: `"Shashank V. WeBlog" <${process.env.EMAIL}>`,
            to: emails.rows.map((curr) => { return (curr.email) }),
            subject: title,
            html: body
        }

        transporter.sendMail(email_message).then(() => { res.json({ success: true, message: "email sent" }) }).catch((err) => console.log(err))
    } catch (error) {
        console.log(error);
    }
})

module.exports = router