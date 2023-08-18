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
const dbpool = require('../../dbconnect');
const bcrypt = require('bcrypt');
router.get('/', (req, res) => res.send("hello from backend"));
router.post('/user-register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = uuidv4();
    const { firstname, lastname, email, user_password, confirm_password } = req.body;
    if (!firstname || !lastname || !email || !user_password || !confirm_password) {
        res.json({ success: false, message: 'Fill all the fields' });
    }
    const emailexist = yield dbpool.query('SELECT email from users WHERE email=$1', [email]);
    if (emailexist) {
        res.json({ success: false, message: 'Email already registered' });
    }
    const salt = bcrypt.gensalt(10);
    const hashedPassword = yield bcrypt.hash(user_password, salt);
    const confirmHashedPassword = yield bcrypt.hash(confirm_password, salt);
    const ismatch = bcrypt.compare(hashedPassword, confirmHashedPassword);
    if (!ismatch) {
        res.json({ success: false, message: 'Password does not match' });
    }
    try {
        const user = yield dbpool.query('INSERT INTO users(id, firstname, lastname, email, user_password, confirm_password) VALUES ($1, $2, $3, $4, $5, $6)', [id, firstname, lastname, email, user_password, confirm_password]);
        if (user) {
            res.json({ success: true, message: 'Registered Successfully' });
        }
        else {
            res.json({ success: false, message: 'User cannot be registered' });
        }
    }
    catch (error) {
        res.json({ success: false, message: error });
    }
}));
router.get('/apit', (req, res) => res.send("apti"));
module.exports = router;
