"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const db = require('../dbconnect');
const { v4: uuidv4 } = require('uuid');
const dbpool = require('../dbconnect');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
require('dotenv').config();
router.use(bodyParser.json());
router.get('/', (req, res) => res.send("hello from backend"));
router.post('/user/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = uuidv4();
    const { firstname, lastname, email, user_password, confirm_password } = req.body;
    if (!firstname || !lastname || !email || !user_password || !confirm_password) {
        res.json({ success: false, message: 'Fill all the fields' });
    }
    else {
        const emailexist = yield dbpool.query('SELECT email from users WHERE email=$1', [email]);
        if (emailexist.rows.length > 0) {
            res.json({ success: false, message: 'Email already registered' });
        }
        else {
            const salt = Number(bcrypt.genSalt(10));
            const hashedPassword = yield bcrypt.hash(user_password, salt);
            const confirmHashedPassword = yield bcrypt.hash(confirm_password, salt);
            const ismatch = yield bcrypt.compare(user_password, confirmHashedPassword);
            if (!ismatch) {
                res.json({ success: false, message: 'Password does not match' });
            }
            else {
                const user = yield dbpool.query("INSERT INTO users(id, firstname, lastname, email, user_password) VALUES($1, $2, $3, $4, $5)", [id, firstname, lastname, email, hashedPassword]);
                if (user) {
                    res.json({ success: true, message: 'Registered Successfully' });
                }
                else {
                    res.json({ success: false, message: 'User cannot be registered' });
                }
            }
        }
    }
}));
router.post('/user/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, user_password } = req.body;
    if (!email || !user_password) {
        res.json({ success: false, message: "Fill all the fields." });
    }
    else {
        const userEmailExists = yield dbpool.query('SELECT * from users WHERE email=$1', [email]);
        console.log(userEmailExists);
        // if(!userEmailExists) {
        //     res.json({ success : false, message : "Email does not exists."});
        // }
        // else {
        // const userStoredPassword =
        // }
    }
}));
module.exports = router;
