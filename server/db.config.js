const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password:  "012345678",
    host: "shelter-postgres",
    port: 5432,
    database: "shelterdb"
})

module.exports = pool;