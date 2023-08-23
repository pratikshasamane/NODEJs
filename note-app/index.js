const express = require("express");
require("dotenv").config();
const connectDb = require("./config/dbConnection");
connectDb();

const app = express();
app.use(express.json());
app.use("/api", require("./notesRoutes/notesRoutes.js"));

const port = process.env.PORT || 8011;
app.listen(port, () => {
  console.log("Listening on ", port);
});
