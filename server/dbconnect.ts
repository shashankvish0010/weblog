import {Pool} from 'pg'
 const pool = new Pool({
    user : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: "localhost",
    port: Number(process.env.DB_PORT),
    database: process.env.DB_Database
});
export default pool