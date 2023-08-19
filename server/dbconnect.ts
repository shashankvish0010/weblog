import {Pool} from 'pg'
 const pool = new Pool({
    user : "postgres",
    password: "Shashank@12",
    host: "localhost",
    port: 5432,
    database: "weblog"
});
export default pool