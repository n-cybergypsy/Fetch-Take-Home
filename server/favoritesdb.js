const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password:  "@TeamRetro2014",
    host: "localhost",
    port: 5432,
    database: "favoritedogs"
})

module.exports = pool;