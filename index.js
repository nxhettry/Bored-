import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const port = 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const data = response.data;
    res.render("index.ejs", { 
      mainData: data, 
    });
  } catch (error) {
    res.render("index.ejs", { error: error.message });
  }
});

app.post("/", async (req, res) => {
  try {
    const type = req.body.type;
    const participants = req.body.participants;
    const fetchApi = await axios.get(`https://bored-api.appbrewery.com/filter?type=${type}&participants=${participants}`);
    const data = fetchApi.data;
    res.render("index.ejs", {
      mainData: data[(Math.floor(Math.random() * data.length)) + 1],
    })
  } catch (error) {
    res.render("index.ejs", {error: "The activity of this type is not available."});
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});