require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const mongoose = require("mongoose");
const db = process.env.database_url;

const connection = async () => {
  await mongoose
    .connect(db)
    .then(() => console.log("Database connected"))
    .catch((e) => console.log("Connection Failed", e));
};

connection();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/images", express.static("images/"));

app.use(require("./routes/router"));

app.listen(port, () => console.log("Listen server on", port));
