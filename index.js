import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { count } from "console";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "html",
  password: "admin",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));




app.get("/",async (req,res)=>{
    res.render("index.ejs")
})

app.post("/add", async (req,res)=>{
    const user = req.body.user
    const country = req.body.country
    try{ 
    await db.query(
        "INSERT INTO visited_countries (user_name, countries, country_code) " +
        "SELECT $1, $2, country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $3 || '%' ",
        [user, country ,country.toLowerCase()]
    );
    console.log("Successfully ran first db query")
    } catch (err){
        console.log(typeof req.body.country )
        console.log("Error adding country_code from db", err)
    }
    try {
        const result = await db.query(
          "SELECT user_name, countries, country_code FROM visited_countries;"
        );
        console.log("Succesfully ran second ")
        const entries = result.rows;
        res.render("table.ejs", { entries: entries });
      } catch (err) {
        console.error("Error fetching data from database", err);
      }
    
})
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });