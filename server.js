const express = require("express");
const app = express();
app.use(express.json());
require("dotenv").config();
const cors = require("cors");
app.use(cors());
app.use(express.json());
const bodyParser = require("body-parser");

app.use("/", require("./router/router"));
require("./DB/db");

app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8000, () => {
  console.log("port is 8000");
});
