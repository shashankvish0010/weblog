import {Pool} from 'pg'

const DatabaseUrl = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}:${process.env.DB_HOST}
:${process.env.DB_PORT}:${process.env.DB_Database}`

 const pool = new Pool({
    connectionString: DatabaseUrl
 });
export default pool