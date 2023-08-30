const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDb = require("./config/dbConnection");
connectDb();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/validate", require("./notesRoutes/validationRouter"));
app.use("/api", require("./notesRoutes/notesRoutes.js"));

const port = process.env.PORT || 8011;
app.listen(port, () => {
  console.log("Listening on ", port);
});
