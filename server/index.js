const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/newdata", async (request, response) => {
    try {
        const { overall, government, industry, beauty, safety, social, cost, lat, lng} = request.body;
        const newData = await pool.query("INSERT INTO datapoint(overall, government, industry, beauty, safety, social, cost, lat, lng) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [overall, government, industry, beauty, safety, social, cost, lat, lng]);
        response.json(newData.rows[0]);
        console.log(request.body);
    } catch (error) {
        console.log(error.message);
    }
});

app.post("/query", async (request, response) => {
    try {
        const { overall, government, industry, beauty, safety, social, cost, selectedOption, startDate, endDate} = request.body;
        data = "SELECT " + selectedOption + ", lat, lng "
        const getData = await pool.query(data + "FROM datapoint WHERE overall >= $1 AND overall <= $2 AND government >= $3 AND government <= $4 AND industry >= $5 AND industry <= $6 AND beauty >= $7 AND beauty <= $8 AND safety >= $9 AND safety <= $10 AND social >= $11 AND social <= $12 AND cost >= $13 AND cost <= $14 AND timestamp >= $15 AND timestamp <= $16", [overall[0], overall[1], government[0], government[1], industry[0], industry[1], beauty[0], beauty[1], safety[0], safety[1], social[0], social[1], cost[0], cost[1], startDate, endDate]);
        response.json(getData.rows);
        console.log(request.body);
    } catch (error) {
        console.log(error.message);
    }
})

app.post("/analysis", async (request, response) => {
    try {
        const { distance, COORDS } = request.body;
        var meters = distance * 1000 
        const getData = await pool.query('SELECT * FROM datapoint WHERE (point(lng, lat) <@> point($1, $2)) < ($3 / 1609.344)', [COORDS.lng, COORDS.lat, meters]);
        response.json(getData.rows);
        console.log(request.body);
    } catch (error) {
        console.log(error.message);
    }
})

app.listen(5000, () => {
    console.log("Server Started @ Port 5000");
});