const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "", //password hidden
    host: "localhost",
    port: 5432,
    database: "" //db hidden
});

module.exports = pool;
