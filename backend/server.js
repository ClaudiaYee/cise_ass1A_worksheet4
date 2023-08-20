const express = require("express");
const cors = require("cors");
const fs = require('fs'); // to read the JSON file
const app = express();



app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Article = db.articles
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    
    // Load and insert the data
    fs.readFile("./dummydata.json", 'utf8', (err, data) => {
      if (err) {
        console.log(`Error reading file from disk: ${err}`);
      } else {
        const articles = JSON.parse(data).articles;
        
        // Check if articles already exist in the database, if not, insert them
        Article.countDocuments({}, (err, count) => {
          if (err) {
            console.log("Error counting documents:", err);
            return;
          }

          if (count === 0) { // if no articles exist in the database
            Article.insertMany(articles, (err, docs) => {
              if (err) {
                console.log("Error inserting articles:", err);
                return;
              }
              console.log("Articles have been successfully loaded into the database!");
            });
          }
        });
      }
    });

  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/turorial.routes")(app);
require("./app/routes/articleRoutes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
