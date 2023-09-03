"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const DatabaseUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}:${process.env.DB_HOST}
:${process.env.DB_PORT}:${process.env.DB_Database}`;
const pool = new pg_1.Pool({
    connectionString: DatabaseUrl
});
exports.default = pool;
