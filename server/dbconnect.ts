const Pool = require('pg').pool;

const pool = new Pool({
    user : "postgres",
    password: "Shashank@12",
    host: "localhost",
    port: 5432,
    database: "weblog"
});

module.exports = pool;