const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

const db = require("./app/models");
// db.sequelize.sync({
//   force: true
// });

db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to bezkoder application."
  });
});

require("./app/routes/run_result.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});