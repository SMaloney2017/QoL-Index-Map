const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    password: "Design_Project%1",
    host: "localhost",
    port: 5432,
    database: "senior_design"
});

module.exports = pool;
