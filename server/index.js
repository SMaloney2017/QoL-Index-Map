const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

app.use(cors());
app.use(express.json());

//Insert from Survey
app.post("/newdata", async (request, response) => {
    try {
        const { overall_score, government_score, industry_score, scenery_score, safeness_score, social_score, cost_score } = request.body;
        const newData = await pool.query("INSERT INTO datapoint(overall_score, government_score, industry_score, scenery_score, safeness_score, social_score, cost_score) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *", [overall_score, government_score, industry_score, scenery_score, safeness_score, social_score, cost_score]);
        response.json(newData.rows[0]);
        console.log(request.body)
    } catch (error) {
        console.log(error.message)
    }
});

/*TODO Get Query from Toolbar
app.post("/query", async (req, res) => {
    try {

    } catch (error) {
        console.log(error.message)
    }
})
*/

app.listen(3000, () => {
    console.log("Server Started @ Port 3000")
});