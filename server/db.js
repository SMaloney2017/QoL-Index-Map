const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "$reactmap_2021",
    host: "localhost",
    port: 5432,
    database: "reactmap"
});

module.exports = pool;
