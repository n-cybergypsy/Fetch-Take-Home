const Pool = require("pg").Pool;
const url = require('url')
const dotenv = require("dotenv")
dotenv.config({ path: "../.env" })


if (process.env.DB_URL){
    const params = url.parse(process.env.DB_URL);
    const auth = params.auth.split(':');

    const pool = new Pool({
        user: auth[0],
        password: auth[1],
        host: params.hostname,
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB
    });
    module.exports = pool;
} else {
    const pool = new Pool({
        user: process.env.POSTGRES_USER,
        password:  process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        database: process.env.POSTGRES_DB
    })
    module.exports = pool;
}