const express = require("express");
const mongoose = require('mongoose');
const config = require('./config/dev')
const path = require("path");
const bodyParser = require("body-parser");

const index = require("./routes/index");
const tasks = require("./routes/tasks");
const Users = require("./routes/users")


const cors = require("cors");

const port = 5000;

mongoose.connect(config.DB_URL);
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

// Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", index);
app.use("/api", tasks);
app.use("/api", Users);

app.listen(port, function() {
  console.log("Server started on port " + port);
});
