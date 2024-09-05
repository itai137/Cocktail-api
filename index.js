import express from "express"
import axios from "axios"
import bodyParser from "body-parser"

const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));



app.get("/", async (req , res) => {

    try {
    const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php") 
    const result =  response.data.drinks[0];
    //console.log(`Drink name: ${result.strDrink}\nImg source: ${result.strDrinkThumb}`);
    console.log(`req.body is : ${req.body}`);
    res.render("index.ejs",{data: result});
    } catch (error){
        console.error("Failed to make request:", error.message);
    res.render("index.ejs", {error: error.message,})
    };
    });


app.post("/search-cocktail", async (req, res) => {
    
    try {
        //console.log(`req.body is : ${req.body[0]}`);
        const searchId = req.body.search;
        console.log("search is :"+searchId);
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchId}`);
        const result =  response.data.drinks[0];
        
        res.render("index.ejs",{data: result});
    } catch (error) {
        res.render("index.ejs", {error: error.message,});
    }
    });




app.listen(port , ()=>{
    console.log(`Server is listening to port ${port} `);
})