const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/newdata", async (request, response) => {
    try {
        const { overall_score, government_score, industry_score, scenery_score, safeness_score, social_score, cost_score, lat, lon} = request.body;
        const newData = await pool.query("INSERT INTO datapoint(overall_score, government_score, industry_score, scenery_score, safeness_score, social_score, cost_score, lat, lon) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *", [overall_score, government_score, industry_score, scenery_score, safeness_score, social_score, cost_score, lat, lon]);
        response.json(newData.rows[0]);
        console.log(request.body);
    } catch (error) {
        console.log(error.message);
    }
});

app.post("/query", async (request, response) => {
    try {
        const { overall_score, government_score, industry_score, scenery_score, safeness_score, social_score, cost_score, selectedOption, startDate, endDate} = request.body;
        data = "SELECT " + selectedOption + ", lat, lon "
        const getData = await pool.query(data + "FROM datapoint WHERE overall_score >= $1 AND overall_score <= $2 AND government_score >= $3 AND government_score <= $4 AND industry_score >= $5 AND industry_score <= $6 AND scenery_score >= $7 AND scenery_score <= $8 AND safeness_score >= $9 AND safeness_score <= $10 AND social_score >= $11 AND social_score <= $12 AND cost_score >= $13 AND cost_score <= $14 AND ts >= $15 AND ts <= $16", [ overall_score[0], overall_score[1], government_score[0], government_score[1], industry_score[0], industry_score[1], scenery_score[0], scenery_score[1], safeness_score[0], safeness_score[1], social_score[0], social_score[1], cost_score[0], cost_score[1], startDate, endDate]);
        response.json(getData.rows);
        console.log(request.body);
    } catch (error) {
        console.log(error.message);
    }
})

app.listen(5000, () => {
    console.log("Server Started @ Port 5000");
});