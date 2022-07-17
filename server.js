require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const api = require("./routes/api");
const app = express();
const path = require("path");
const pug = require("pug");
const ClientService = require("./services/client.services");
const ClientModel = require("./models/ClientModel");

const PORT = process.env.PORT || 8100;
const URI = process.env.MONGODB_URI || process.env.ATLAS_URI;

mongoose.connect(URI);
const connection = mongoose.connection;
connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", () => {
  mongoose.connection.db.collection("clients").countDocuments((err, count) => {
    if (count == 0 || count === null) {
      console.log("count of collection is empty");
      ClientService.saveInitialClients();
    } else if (count > 0) {
      console.log("collection is not empty", count);
    }
    if (err) {
      console.log("err when counting collection ", err);
    }
  });
});

app.use(cors());

// body-parser middleware
app.use(express.json());

// heroku
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// view engine setup
// app.set("view engine", "pug");
// app.set("views", path.join(__dirname, "views"));

app.use("/", api);

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  /* res.status === 500
    ? res.render("500.pug", {
        title: "500: Internal Server Error",
        error: error
      })
    : res.json({ error: error.message }); */
});

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
